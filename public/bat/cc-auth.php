<?php
/**
 * Constant Contact OAuth2 Authorization
 *
 * Run this script ONCE to authorize your app and get tokens.
 * After authorization, tokens will be stored in .cc-tokens.json
 *
 * Steps:
 * 1. Visit https://embankment.org/bat/cc-auth.php in your browser
 * 2. Click "Authorize with Constant Contact"
 * 3. Log in and approve access
 * 4. Tokens will be saved automatically
 */

$configFile = __DIR__ . '/.cc-config.json';
if (!file_exists($configFile)) {
    die('Error: .cc-config.json not found');
}

$config = json_decode(file_get_contents($configFile), true);
$config['redirect_uri'] = 'https://embankment.org/bat/cc-auth.php';
$config['token_file'] = __DIR__ . '/.cc-tokens.json';

session_start();

// Step 3: Handle the callback with authorization code
if (isset($_GET['code'])) {
    $code = $_GET['code'];

    // Exchange authorization code for tokens
    $ch = curl_init('https://authz.constantcontact.com/oauth2/default/v1/token');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'grant_type' => 'authorization_code',
        'code' => $code,
        'redirect_uri' => $config['redirect_uri'],
    ]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Basic ' . base64_encode($config['client_id'] . ':' . $config['client_secret']),
        'Content-Type: application/x-www-form-urlencoded',
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        $data = json_decode($response, true);
        $tokens = [
            'access_token' => $data['access_token'],
            'refresh_token' => $data['refresh_token'],
            'expires_at' => time() + $data['expires_in'],
        ];

        file_put_contents($config['token_file'], json_encode($tokens, JSON_PRETTY_PRINT));
        chmod($config['token_file'], 0600);

        echo "<h1>✅ Authorization Successful!</h1>";
        echo "<p>Tokens have been saved. Your email signup form is now ready to use.</p>";
        echo "<p><a href='/'>Return to homepage</a></p>";
        exit;
    } else {
        echo "<h1>❌ Authorization Failed</h1>";
        echo "<p>Error: $response</p>";
        echo "<p><a href='cc-auth.php'>Try again</a></p>";
        exit;
    }
}

// Step 1: Show authorization button
if (!isset($_GET['authorize'])) {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Constant Contact Authorization</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
            .btn { display: inline-block; padding: 15px 30px; background: #0073e6; color: white; text-decoration: none; border-radius: 5px; }
            .btn:hover { background: #005bb5; }
        </style>
    </head>
    <body>
        <h1>Constant Contact Authorization</h1>
        <p>Click the button below to authorize the Embankment website to add signups to your Constant Contact list.</p>
        <p><strong>Note:</strong> You only need to do this once. After authorization, tokens will be stored securely.</p>
        <p><a href="?authorize=1" class="btn">Authorize with Constant Contact</a></p>
    </body>
    </html>
    <?php
    exit;
}

// Step 2: Redirect to Constant Contact OAuth authorization
$authUrl = 'https://authz.constantcontact.com/oauth2/default/v1/authorize?' . http_build_query([
    'client_id' => $config['client_id'],
    'redirect_uri' => $config['redirect_uri'],
    'response_type' => 'code',
    'scope' => 'contact_data offline_access',
    'state' => bin2hex(random_bytes(16)), // CSRF protection
]);

header('Location: ' . $authUrl);
exit;
