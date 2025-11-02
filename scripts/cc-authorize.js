#!/usr/bin/env node
/**
 * Constant Contact OAuth2 Authorization Script
 *
 * Run this script locally to get OAuth tokens:
 *   node scripts/cc-authorize.js
 *
 * It will:
 * 1. Start a local server on http://localhost:3030
 * 2. Open your browser to authorize
 * 3. Receive the callback and exchange code for tokens
 * 4. Save tokens to public/bat/.cc-tokens.json
 */

import http from 'http';
import { URL } from 'url';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    client_id: process.env.CC_CLIENT_ID,
    client_secret: process.env.CC_CLIENT_SECRET,
    redirect_uri: 'http://localhost:3030/callback',
    token_file: path.join(__dirname, '../public/bat/.cc-tokens.json'),
};

// Validate credentials
if (!config.client_id || !config.client_secret) {
    console.error('Error: CC_CLIENT_ID and CC_CLIENT_SECRET environment variables must be set');
    process.exit(1);
}

// Step 2: Exchange authorization code for tokens
async function exchangeCodeForTokens(code) {
    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: config.redirect_uri,
    });

    const auth = Buffer.from(`${config.client_id}:${config.client_secret}`).toString('base64');

    const response = await fetch('https://authz.constantcontact.com/oauth2/default/v1/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Token exchange failed: ${error}`);
    }

    return await response.json();
}

// Create HTTP server to handle OAuth callback
const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:3030`);

    if (url.pathname === '/callback' && url.searchParams.has('code')) {
        try {
            const code = url.searchParams.get('code');
            console.log('✓ Received authorization code, exchanging for tokens...');

            const tokenData = await exchangeCodeForTokens(code);

            const tokens = {
                access_token: tokenData.access_token,
                refresh_token: tokenData.refresh_token,
                expires_at: Math.floor(Date.now() / 1000) + tokenData.expires_in,
            };

            // Save tokens
            fs.writeFileSync(config.token_file, JSON.stringify(tokens, null, 2));
            fs.chmodSync(config.token_file, 0o600);

            console.log('✓ Tokens saved to:', config.token_file);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Authorization Successful</title>
                    <style>
                        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
                        h1 { color: #28a745; }
                    </style>
                </head>
                <body>
                    <h1>✅ Authorization Successful!</h1>
                    <p>Tokens have been saved. You can close this window and return to your terminal.</p>
                </body>
                </html>
            `);

            setTimeout(() => {
                console.log('\n✓ Authorization complete! Shutting down server...\n');
                server.close();
                process.exit(0);
            }, 2000);

        } catch (error) {
            console.error('✗ Error:', error.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Authorization failed. Check the terminal for details.');
            server.close();
            process.exit(1);
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

// Start server and open browser
server.listen(3030, () => {
    console.log('✓ Local server started on http://localhost:3030\n');

    const authUrl = 'https://authz.constantcontact.com/oauth2/default/v1/authorize?' + new URLSearchParams({
        client_id: config.client_id,
        redirect_uri: config.redirect_uri,
        response_type: 'code',
        scope: 'contact_data offline_access',
        state: Math.random().toString(36).substring(7),
    }).toString();

    console.log('Opening browser for authorization...\n');
    console.log('If your browser doesn\'t open automatically, visit:\n');
    console.log(authUrl + '\n');

    // Open browser (works on macOS, Linux, Windows)
    const command = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${command} "${authUrl}"`);
});
