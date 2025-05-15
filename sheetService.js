import { google } from 'googleapis';
import dotenv from 'dotenv';
import { getAuthClient } from './auth.js';

dotenv.config();

export async function readSheet(range) {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    return res.data.values || [];
}