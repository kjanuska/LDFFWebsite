/**
 * Download all sheets from a Google Sheets file as CSV files.
 *
 * One-time setup:
 *   1. Enable Google Sheets API at https://console.cloud.google.com
 *   2. Create OAuth 2.0 credentials → Desktop app → download as `credentials.json` in project root
 *   3. npm install googleapis
 *   4. Run this script — it will open a browser to authorize on first run
 *
 * Usage:
 *   npm run download:sheets
 *
 * Set SPREADSHEET_ID in .env (copy .env.example).
 * The spreadsheet ID is the long string in the Google Sheets URL:
 *   https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit
 *
 * CSVs are saved to data/csv/<sheet-name>.csv (matching the tab names).
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Load .env manually (no extra dependency needed)
const envPath = path.resolve('.env');
if (fs.existsSync(envPath)) {
	for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
		const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/);
		if (match) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
	}
}
import http from 'http';
import { URL } from 'url';
import readline from 'readline';
import { google } from 'googleapis';

const CREDENTIALS_PATH = path.resolve('credentials.json');
const TOKEN_PATH = path.resolve('token.json');
const OUTPUT_DIR = path.resolve('data/csv');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

async function getAuthClient() {
	if (!fs.existsSync(CREDENTIALS_PATH)) {
		throw new Error(
			`credentials.json not found at project root.\n` +
			`Download it from Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs.`
		);
	}

	const raw = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
	const { client_id, client_secret } = raw.installed ?? raw.web;

	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3000');

	if (fs.existsSync(TOKEN_PATH)) {
		const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
		oAuth2Client.setCredentials(token);

		// Refresh if expired
		if (token.expiry_date && token.expiry_date < Date.now()) {
			console.log('Token expired, refreshing...');
			const { credentials } = await oAuth2Client.refreshAccessToken();
			oAuth2Client.setCredentials(credentials);
			fs.writeFileSync(TOKEN_PATH, JSON.stringify(credentials));
		}

		return oAuth2Client;
	}

	// First-time auth: start a local server to catch the redirect
	const code = await authorizeViaLocalServer(oAuth2Client);
	const { tokens } = await oAuth2Client.getToken(code);
	oAuth2Client.setCredentials(tokens);
	fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
	console.log('Token saved to token.json');
	return oAuth2Client;
}

function authorizeViaLocalServer(oAuth2Client: InstanceType<typeof google.auth.OAuth2>): Promise<string> {
	return new Promise((resolve, reject) => {
		const server = http.createServer((req, res) => {
			try {
				const qs = new URL(req.url!, 'http://localhost:3000').searchParams;
				const code = qs.get('code');
				if (!code) { res.end('No code received.'); return; }
				res.end('<h2>Authorized! You can close this tab.</h2>');
				server.close();
				resolve(code);
			} catch (e) {
				reject(e);
			}
		});

		server.listen(3000, () => {
			const authUrl = oAuth2Client.generateAuthUrl({
				access_type: 'offline',
				scope: SCOPES,
			});
			console.log('\nOpening browser for authorization...');
			console.log('If it does not open automatically, visit:\n', authUrl, '\n');
			// Try to open browser cross-platform
			try {
				const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
				execSync(`${cmd} "${authUrl}"`);
			} catch {}
		});
	});
}

async function downloadAllSheets(spreadsheetId: string) {
	const auth = await getAuthClient();
	const sheets = google.sheets({ version: 'v4', auth });

	// Fetch spreadsheet metadata to get sheet names
	const meta = await sheets.spreadsheets.get({ spreadsheetId });
	const sheetList = meta.data.sheets ?? [];

	if (sheetList.length === 0) {
		console.log('No sheets found.');
		return;
	}

	console.log(`Found ${sheetList.length} sheet(s): ${sheetList.map(s => s.properties?.title).join(', ')}\n`);
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });

	for (const sheet of sheetList) {
		const title = sheet.properties?.title;
		if (!title) continue;

		// Fetch all values for this sheet
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId,
			range: title,
		});

		const rows = response.data.values ?? [];
		const csv = rows.map(row => row.map(cell => csvEscapeCell(String(cell ?? ''))).join(',')).join('\n');

		const filename = path.join(OUTPUT_DIR, `${title}.csv`);
		fs.writeFileSync(filename, csv + '\n', 'utf-8');
		console.log(`  ✓ ${title} → data/csv/${title}.csv (${rows.length} rows)`);
	}

	console.log('\nDone.');
}

function csvEscapeCell(value: string): string {
	if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
		return `"${value.replace(/"/g, '""')}"`;
	}
	return value;
}

// --- Main ---
const spreadsheetId = process.env.SPREADSHEET_ID;
if (!spreadsheetId) {
	console.error('SPREADSHEET_ID is not set. Add it to your .env file (see .env.example).');
	process.exit(1);
}

downloadAllSheets(spreadsheetId).catch(err => {
	console.error('Error:', err.message ?? err);
	process.exit(1);
});
