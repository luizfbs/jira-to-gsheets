const parser = require('../../src/parsers/status.js');

const entry = require('./entry.json');

const findStatus = (entry, status) => {
  const history = entry.changelog.histories.find(x => x.items[0]['field'] === 'status' && x.items[0]['toString'] === status);
  if(history) return new Date(history['created']);
}

test('parse status from changelog', () => {
  const result = parser.parse(entry);
  expect(result['Created']).toEqual(new Date(entry.fields.created));
  expect(result['Ready to Do']).toEqual(findStatus(entry, 'Ready to Do'));
  expect(result['Doing']).toEqual(findStatus(entry, 'Doing'));
  expect(result['Code Review']).toEqual(findStatus(entry, 'Acceptance Testing'));
  expect(result['Ready 4 Tests']).toEqual(findStatus(entry, 'Acceptance Testing'));
  expect(result['Acceptance Testing']).toEqual(findStatus(entry, 'Acceptance Testing'));
  expect(result['Fixing']).toEqual(findStatus(entry, 'Ready To Deploy'));
  expect(result['Ready to merge']).toEqual(findStatus(entry, 'Ready to merge'));
  expect(result['Ready To Deploy']).not.toEqual(findStatus(entry, 'Ready To Deploy'));
  expect(result['Done']).toEqual(findStatus(entry, 'Done'));

  console.log('Created', ' - ', findStatus(entry, 'Created'), ' - ', result['Created']);
  console.log('Ready to Do', ' - ', findStatus(entry, 'Ready to Do'), ' - ', result['Ready to Do']);
  console.log('Doing', ' - ', findStatus(entry, 'Doing'), ' - ', result['Doing']);
  console.log('Code Review', ' - ', findStatus(entry, 'Code Review'), ' - ', result['Code Review']);
  console.log('Ready 4 Tests', ' - ', findStatus(entry, 'Ready 4 Tests'), ' - ', result['Ready 4 Tests']);
  console.log('Acceptance Testing', ' - ', findStatus(entry, 'Acceptance Testing'), ' - ', result['Acceptance Testing']);
  console.log('Fixing', ' - ', findStatus(entry, 'Fixing'), ' - ', result['Fixing']);
  console.log('Ready to merge', ' - ', findStatus(entry, 'Ready to merge'), ' - ', result['Ready to merge']);
  console.log('Ready To Deploy', ' - ', findStatus(entry, 'Ready To Deploy'), ' - ', result['Ready To Deploy']);
  console.log('Done', ' - ', findStatus(entry, 'Done'), ' - ', result['Done']);
})
