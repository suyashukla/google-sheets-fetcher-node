#!/usr/bin/env node
import { readSheet } from './sheetService.js';

async function main() {
    try {
        const range = process.env.GOOGLE_SHEET_RANGE;
        const rows = await readSheet(range);

        console.log(`📄 Read ${rows.length} rows:\n`);
        for (const row of rows) {
        console.log(row.join(' | '));
        }
    } catch (err) {
        console.error('❌ Error:', err.message || err);
    }
}

main();