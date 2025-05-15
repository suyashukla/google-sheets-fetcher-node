import fs from 'fs';
import os from 'os';
import path from 'path';
import readline from 'readline';
import open from 'open';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_PATH = path.join(os.homedir(), '.gsheet-token.json');

export async function getAuthClient() {
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL } = process.env;

const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL
);

if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
}

const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    prompt: 'consent',
});

console.log('\n👉 Please authorize the app. Opening browser...');
await open(authUrl);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const code = await new Promise((resolve) =>
    rl.question('\nPaste the code from the browser here: ', (answer) => {
        rl.close();
        resolve(answer);
    })
);

const { tokens } = await oAuth2Client.getToken(code);
oAuth2Client.setCredentials(tokens);

fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
console.log('✅ Token saved to', TOKEN_PATH);

return oAuth2Client;
}