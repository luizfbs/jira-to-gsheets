import { SingleBar, Presets } from 'cli-progress';

import { retrieveAll, retrieveEpics } from './services/jira.js';
import { save } from './services/gsheets.js';

import logger from './helpers/logger.js';

import { convertMany } from './models/entry.js';

export async function main(){
  const progress = new SingleBar({}, Presets.shades_classic);

  logger('Downloading issues...');
  const issues = await retrieveAll(progress);

  logger('Downloading epics...');
  const ids = issues.filter((e) => e?.fields?.customfield_10004)
    .map((e) => e.fields?.customfield_10004)
  const epics = await retrieveEpics(progress, ids);

  logger('Preparing data...');
  const data = convertMany(progress, issues, epics);

  logger('Saving data to Google Sheets...');
  await save(progress, data);

  logger('\x1b[42m', `Success! ${data.length} rows updated :)`, '\x1b[0m');
  return true;
}

main().catch((e) => {
  logger('\x1b[41m', e, '\x1b[0m');
});
