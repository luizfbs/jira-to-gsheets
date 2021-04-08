const service = require('../../src/services/jira.js');

const cliProgress = require('cli-progress');
const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const fetch = require('node-fetch');
jest.mock('node-fetch');

test('retrieve all page from JIRA', async () => {
  fetch.mockClear()
      .mockResolvedValueOnce({ json: () => require('../__mocks__/data/jira.retrieve.page-1.json') })
      .mockResolvedValueOnce({ json: () => require('../__mocks__/data/jira.retrieve.page-2.json') });

  const result = await service.retrieveAll(progress);
  expect(result.length).toBe(6);
});

test('get JIRA epics from keys', async () => {
  fetch.mockClear()
    .mockResolvedValueOnce({ json: () => require('../__mocks__/data/jira.get-epic-001.json') })
    .mockResolvedValueOnce({ json: () => require('../__mocks__/data/jira.get-epic-002.json') });
    
  const keys = ['EPIC-001','EPIC-001','EPIC-002'];
  const result = await service.retrieveEpics(progress, keys);
  expect(result.length).toBe(2);
});
