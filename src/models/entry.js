import { toLocale, toCycle, calculateDiff } from '../formatters/date.js';
import { isBlocked, toEpicName } from '../formatters/issue.js';

import { parse } from '../parsers/status.js';

export function convert(issue, epics) {
  const status = parse(issue);

  return [
    issue.key,
    issue.fields?.issuetype?.name,
    (issue.fields?.customfield_13902?.value || ''),
    issue.fields?.summary,
    isBlocked(issue.fields?.customfield_10200),
    (issue.fields?.labels.find(() => true) || ''),
    toLocale(new Date(issue.fields?.customfield_11035)),
    (issue.fields?.customfield_14500?.value || ''),
    toCycle(status.Created),
    '', // métricas
    '', // classificação
    toEpicName(issue.fields?.customfield_10004, epics),
    '', // iniciativa
    toLocale(status.Created),
    calculateDiff(status.Created, status['Ready to Do']),
    toLocale(status['Ready to Do']),
    calculateDiff(status['Ready to Do'], status.Doing),
    toLocale(status.Doing),
    calculateDiff(status.Doing, status['Code Review']),
    toLocale(status['Code Review']),
    calculateDiff(status['Code Review'], status['Ready 4 Tests']),
    toLocale(status['Ready 4 Tests']),
    calculateDiff(status['Ready 4 Tests'], status['Acceptance Testing']),
    toLocale(status['Acceptance Testing']),
    calculateDiff(status['Acceptance Testing'], status.Fixing),
    toLocale(status.Fixing),
    calculateDiff(status.Fixing, status['Ready to merge']),
    toLocale(status['Ready to merge']),
    calculateDiff(status['Ready to merge'], status['Ready To Deploy']),
    toLocale(status['Ready To Deploy']),
    calculateDiff(status['Ready To Deploy'], status.Done),
    toLocale(status.Done),
  ];
}

export function convertMany(progress, issues, epics) {
  progress.start(issues.length, 0);

  const data = issues.map((e, i, arr) => {
    const issue = convert(arr[arr.length - 1 - i], epics);
    progress.update(i + 1);
    return issue;
  });

  progress.stop();
  return data;
}
