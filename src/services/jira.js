import fetch from 'node-fetch';

import { encode as b64encode } from '../helpers/base64.js';

import config from '../config.js';

let headers;
function prepareHeaders() {
  if (!headers) {
    headers = {
      headers: {
        Authorization: `Basic ${b64encode(`${config.jira.api.username}:${config.jira.api.password}`)}`,
      },
    };
  }
  return headers;
}

export async function retrieve(page) {
  const startAt = (page - 1) * config.jira.project.pagesize;
  const fields = ['summary', 'status', 'issuetype', 'created', 'updated', 'labels', 'customfield_14500', 'customfield_10004', 'customfield_13902', 'customfield_10200', 'customfield_11035'];
  const expand = ['changelog'];
  const query = `Created > 2020-10-01 and type != Epic and project = ${config.jira.project.id}`;

  const response = await fetch(`${config.jira.api.endpoint}/rest/api/2/search?maxResults=${
    config.jira.project.pagesize}&startAt=${startAt}&fields=${fields.join(',')}&expand=${expand}&jql=${query}`, prepareHeaders());

  return response.json();
}

export async function retrieveAll(progress) {
  let data = [];
  let page = 1;

  let result = await retrieve(page);
  data = data.concat(result.issues);
  progress.start(result.total, 0);

  while (result.total > data.length) {
    page += 1;
    // eslint-disable-next-line no-await-in-loop
    result = await retrieve(page);
    data = data.concat(result.issues);
    progress.update(data.length);
  }

  progress.stop();
  return data.reverse();
}

export async function get(id) {
  const fields = ['summary'];
  const response = await fetch(`${config.jira.api.endpoint}/rest/api/2/issue/${id}?fields=${fields.join(',')}`, prepareHeaders());

  return response.json();
}

export async function retrieveEpics(progress, ids) {
  const filtered = ids.filter((e, i, a) => a.indexOf(e) === i);
  progress.start(filtered.length, 0);

  const data = await filtered.reduce(async (a, e, i) => {
    const accumulator = await a;
    const epic = await get(e);
    progress.update(i + 1);
    return [...accumulator, epic];
  }, []);

  progress.stop();
  return data;
}
