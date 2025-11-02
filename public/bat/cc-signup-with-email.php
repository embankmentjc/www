<?php
/**
 * Constant Contact API signup handler with email notification
 * Adds email signups directly to Constant Contact list
 * For volunteer signups with background info, also sends email notification
 */

// Configuration - load from config file
$configFile = __DIR__ . '/.cc-config.json';
if (!file_exists($configFile)) {
    error_log('CC: Missing .cc-config.json');
    die('MF256'); // Configuration error
}

$config = json_decode(file_get_contents($configFile), true);
$config['token_file'] = __DIR__ . '/.cc-tokens.json';

// Load email config if exists
$emailConfigFile = __DIR__ . '/.rd-mailform.config.json';
$emailConfig = null;
if (file_exists($emailConfigFile)) {
    $emailConfig = json_decode(file_get_contents($emailConfigFile), true);
}

// Rate limiting and spam prevention
function getRemoteIPAddress() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    return $_SERVER['REMOTE_ADDR'];
}

if (preg_match('/^(127\.|192\.168\.|::1)/', getRemoteIPAddress())) {
    die('MF002'); // Local IP blocked
}

// Get tokens from storage
function getTokens($config) {
    if (!file_exists($config['token_file'])) {
        return null;
    }
    $data = json_decode(file_get_contents($config['token_file']), true);
    return $data;
}

// Save tokens to storage
function saveTokens($config, $tokens) {
    file_put_contents($config['token_file'], json_encode($tokens, JSON_PRETTY_PRINT));
    chmod($config['token_file'], 0600); // Read/write for owner only
}

// Refresh access token using refresh token
function refreshAccessToken($config, $refreshToken) {
    $ch = curl_init('https://authz.constantcontact.com/oauth2/default/v1/token');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array(
        'grant_type' => 'refresh_token',
        'refresh_token' => $refreshToken,
    )));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Basic ' . base64_encode($config['client_id'] . ':' . $config['client_secret']),
        'Content-Type: application/x-www-form-urlencoded',
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200) {
        error_log("CC Token Refresh Failed: $response");
        return null;
    }

    $data = json_decode($response, true);
    return array(
        'access_token' => $data['access_token'],
        'refresh_token' => $data['refresh_token'],
        'expires_at' => time() + $data['expires_in'],
    );
}

// Get valid access token (refresh if needed)
function getAccessToken($config) {
    $tokens = getTokens($config);

    if (!$tokens) {
        error_log('CC: No tokens found. Run cc-auth.php first to authorize.');
        return null;
    }

    // If token expires in less than 5 minutes, refresh it
    if ($tokens['expires_at'] < time() + 300) {
        $newTokens = refreshAccessToken($config, $tokens['refresh_token']);
        if ($newTokens) {
            saveTokens($config, $newTokens);
            return $newTokens['access_token'];
        }
        return null;
    }

    return $tokens['access_token'];
}

// Add contact to Constant Contact
function addContactToList($config, $email, $firstName = '', $lastName = '', $phone = '') {
    $accessToken = getAccessToken($config);
    if (!$accessToken) {
        return array('success' => false, 'error' => 'AUTH_FAILED');
    }

    $contactData = array(
        'email_address' => $email,
        'list_memberships' => array($config['list_id']),
    );

    if ($firstName) {
        $contactData['first_name'] = $firstName;
    }
    if ($lastName) {
        $contactData['last_name'] = $lastName;
    }
    if ($phone) {
        $contactData['phone_number'] = $phone;
    }

    $ch = curl_init('https://api.cc.email/v3/contacts/sign_up_form');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($contactData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json',
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 201 || $httpCode === 200) {
        $data = json_decode($response, true);
        return array('success' => true, 'action' => isset($data['action']) ? $data['action'] : 'unknown');
    }

    error_log("CC Add Contact Failed ($httpCode): $response");
    return array('success' => false, 'error' => 'API_FAILED', 'http_code' => $httpCode);
}

// Log signup to file
function logSignupToFile($email, $firstName, $lastName, $phone, $message) {
    $logFile = __DIR__ . '/signups.log';
    $timestamp = date('Y-m-d H:i:s');

    $entry = "\n=== Signup: $timestamp ===\n";
    if ($firstName || $lastName) {
        $entry .= "Name: $firstName $lastName\n";
    }
    $entry .= "Email: $email\n";
    if ($phone) {
        $entry .= "Phone: $phone\n";
    }
    if ($message) {
        $entry .= "Background/Message:\n$message\n";
    }
    $entry .= "=========================\n";

    file_put_contents($logFile, $entry, FILE_APPEND | LOCK_EX);
    chmod($logFile, 0600); // Read/write for owner only

    return true;
}

// Append signup to Google Sheet
function appendToGoogleSheet($email, $firstName, $lastName, $phone, $message) {
    // Load the Google Sheets append helper
    require_once __DIR__ . '/google-sheets-append.php';

    $spreadsheetId = '1IO6K_JXvo4eTGu5bmIeV38XpQUjVZfGgbEYSRPd1WME';
    $sheetName = 'Website Signups'; // Tab name in your spreadsheet

    $row = array(
        date('Y-m-d H:i:s'),                    // Timestamp
        trim($firstName . ' ' . $lastName),     // Full name
        $email,                                  // Email
        $phone ? $phone : '',                    // Phone (optional)
        $message ? $message : ''                 // Message (optional)
    );

    return appendToSheet($spreadsheetId, $sheetName, $row);
}

// Send email notification using PHPMailer
function sendEmailNotification($emailConfig, $email, $firstName, $lastName, $phone, $message) {
    if (!$emailConfig || !$emailConfig['useSmtp']) {
        error_log("Email notification skipped - SMTP not configured");
        return false;
    }

    require_once __DIR__ . '/phpmailer/PHPMailerAutoload.php';

    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->SMTPDebug = 2; // Enable verbose debug output
    $mail->Debugoutput = function($str, $level) {
        error_log("SMTP Debug [$level]: $str");
    };
    $mail->Host = $emailConfig['host'];
    $mail->Port = $emailConfig['port'];
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = "ssl";
    $mail->Username = $emailConfig['username'];
    $mail->Password = $emailConfig['password'];

    $mail->setFrom($emailConfig['username'], 'Embankment Website');
    $mail->addAddress($emailConfig['recipientEmail']);

    // Different subject based on whether it's a volunteer or newsletter signup
    if ($message) {
        $mail->Subject = 'New Volunteer Signup';
    } else {
        $mail->Subject = 'New Email Signup';
    }

    $body = "New signup from the website:\n\n";
    if ($firstName || $lastName) {
        $body .= "Name: $firstName $lastName\n";
    }
    $body .= "Email: $email\n";
    if ($phone) {
        $body .= "Phone: $phone\n";
    }
    if ($message) {
        $body .= "\nBackground/Message:\n$message\n";
    }

    $mail->Body = $body;

    error_log("Attempting to send email to {$emailConfig['recipientEmail']} for signup: $email");

    if (!$mail->send()) {
        error_log("Email send failed: " . $mail->ErrorInfo);
        return false;
    }

    error_log("Email sent successfully for signup: $email");
    return true;
}

// Main handler
try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        die('MF003'); // Only POST allowed
    }

    if (!isset($_POST['email'])) {
        die('MF004'); // Missing email
    }

    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    if (!$email) {
        die('MF005'); // Invalid email
    }

    // Extract name and phone if provided
    $firstName = isset($_POST['firstname']) ? $_POST['firstname'] : (isset($_POST['name']) ? $_POST['name'] : '');
    $lastName = isset($_POST['lastname']) ? $_POST['lastname'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    // Always log signup to file
    logSignupToFile($email, $firstName, $lastName, $phone, $message);

    // Try to append to Google Sheet
    appendToGoogleSheet($email, $firstName, $lastName, $phone, $message);

    // Try to send email notification (will fail if SMTP blocked, but that's OK)
    if ($emailConfig) {
        sendEmailNotification($emailConfig, $email, $firstName, $lastName, $phone, $message);
    }

    // Always add to Constant Contact
    $result = addContactToList($config, $email, $firstName, $lastName, $phone);

    if ($result['success']) {
        die('MF000'); // Success
    } else {
        error_log("Signup failed for $email: " . json_encode($result));
        die('MF254'); // API error
    }

} catch (Exception $e) {
    error_log("CC Signup Exception: " . $e->getMessage());
    die('MF255'); // Generic error
}
