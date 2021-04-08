import { writeFileSync, readFileSync } from 'fs';
import { createInterface } from 'readline';

import { google } from 'googleapis';

import logger from '../helpers/logger.js';

import config from '../config.js';

export async function getToken(client) {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: config.google.api.scope,
  });

  logger('Authorize this app by visiting this url:', authUrl);
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  logger('Enter the code from that page here: ');
  const iterator = rl[Symbol.asyncIterator]();

  const input = await iterator.next();
  const code = input.value;

  const response = await client.getToken(code);
  const token = response.tokens;

  client.setCredentials(token);
  writeFileSync(config.google.api.token.path, JSON.stringify(token));

  rl.close();
  return client;
}

export async function authorize() {
  const client = new google.auth.OAuth2(
    config.google.api.client.id,
    config.google.api.client.secret,
    config.google.api.redirect.uris[0],
  );

  try {
    const token = JSON.parse(readFileSync(config.google.api.token.path, 'utf8'));
    client.setCredentials(token);
    return client;
  } catch (e) {
    return getToken(client);
  }
}

export async function save(progress, data) {
  const client = await authorize();
  const sheets = google.sheets('v4');

  progress.start(100, 0);

  await sheets.spreadsheets.values.update({
    auth: client,
    spreadsheetId: config.google.sheets.spreadsheet.id,
    range: `Items!A2:AF${data.length + 3}`,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: data,
    },
  });

  progress.update(100);
  progress.stop();

  return true;
}
