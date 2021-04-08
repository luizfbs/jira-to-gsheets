const model = require('../../src/models/entry.js');

const entry = require('./entry.json');

test('convert issue to entry', () => {
  const epics = [{ key: entry.fields?.customfield_10004, fields: {summary: 'My EPIC Name'} }];
  const result = model.convert(entry, epics);
  expect(result[0]).toBe(entry.key);
});

test('convert issues to entries', () => {
  entry['fields']['labels'] = [];
  entry['changelog']['histories'] = [];
  const progress = {
    start: function(){ },
    update: function(){ },
    stop: function(){ }
  };
  const epics = [{ key: entry.fields?.customfield_10004, fields: {summary: 'My EPIC Name'} }];
  const result = model.convertMany(progress, [entry], epics);
  expect(result[0][0]).toBe(entry.key);
});
