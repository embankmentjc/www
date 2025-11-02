<?php
/**
 * Google Sheets Append Helper
 * Appends a row to a Google Sheet using service account authentication
 *
 * PHP 5.3 compatible
 */

// Load service account credentials
function getServiceAccountCredentials() {
    $credFile = __DIR__ . '/.google-service-account.json';
    if (!file_exists($credFile)) {
        error_log("Google service account credentials not found");
        return null;
    }
    return json_decode(file_get_contents($credFile), true);
}

// Generate JWT for service account
function generateJWT($credentials) {
    $now = time();
    $header = array(
        'alg' => 'RS256',
        'typ' => 'JWT'
    );

    $claim = array(
        'iss' => $credentials['client_email'],
        'scope' => 'https://www.googleapis.com/auth/spreadsheets',
        'aud' => 'https://oauth2.googleapis.com/token',
        'exp' => $now + 3600,
        'iat' => $now
    );

    $segments = array(
        base64url_encode(json_encode($header)),
        base64url_encode(json_encode($claim))
    );

    $signing_input = implode('.', $segments);

    $signature = '';
    $success = openssl_sign(
        $signing_input,
        $signature,
        $credentials['private_key'],
        'SHA256'
    );

    if (!$success) {
        error_log("Failed to sign JWT");
        return null;
    }

    $segments[] = base64url_encode($signature);
    return implode('.', $segments);
}

// Base64 URL encoding (JWT standard)
function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

// Exchange JWT for access token
function getAccessToken($credentials) {
    $jwt = generateJWT($credentials);
    if (!$jwt) {
        return null;
    }

    $ch = curl_init('https://oauth2.googleapis.com/token');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array(
        'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion' => $jwt
    )));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200) {
        error_log("Failed to get access token: HTTP $httpCode - $response");
        return null;
    }

    $data = json_decode($response, true);
    return $data['access_token'];
}

// Append row to Google Sheet
function appendToSheet($spreadsheetId, $sheetName, $values) {
    $credentials = getServiceAccountCredentials();
    if (!$credentials) {
        return false;
    }

    $accessToken = getAccessToken($credentials);
    if (!$accessToken) {
        return false;
    }

    $range = urlencode($sheetName . '!A:Z');
    $url = "https://sheets.googleapis.com/v4/spreadsheets/$spreadsheetId/values/$range:append?valueInputOption=USER_ENTERED";

    $data = array(
        'range' => $sheetName . '!A:Z',
        'values' => array($values)
    );

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json'
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        error_log("Successfully appended row to Google Sheet");
        return true;
    } else {
        error_log("Failed to append to Google Sheet: HTTP $httpCode - $response");
        return false;
    }
}

// Example usage (for testing)
if (php_sapi_name() === 'cli') {
    // Test from command line
    $spreadsheetId = '1IO6K_JXvo4eTGu5bmIeV38XpQUjVZfGgbEYSRPd1WME';
    $sheetName = 'Website Signups'; // Create this tab in your sheet

    $testRow = array(
        date('Y-m-d H:i:s'), // Timestamp
        'Test User',         // Name
        'test@example.com',  // Email
        '201-555-1234',      // Phone
        'Test message'       // Message
    );

    if (appendToSheet($spreadsheetId, $sheetName, $testRow)) {
        echo "Success!\n";
    } else {
        echo "Failed!\n";
    }
}
