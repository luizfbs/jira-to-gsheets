const formatter = require('../../src/formatters/issue.js');

test('pass null to is blocked', () => {
  expect(formatter.isBlocked(null)).toBe('');
});

test('format a blocked as a string', () => {
  const flagged = [{ value:'Impediment' }];
  expect(formatter.isBlocked(flagged)).toBe('YES');
});

test('pass null to get epic name', () => {
  expect(formatter.toEpicName(null)).toBe('');
});

test('format a epic id as a string', () => {
  const key = 'EPC-1';
  const epics = [{ key, fields: {summary: 'My EPIC Name'} }];
  expect(formatter.toEpicName(key, epics)).toBe(`[${key}] ${epics[0].fields?.summary}`);
});
