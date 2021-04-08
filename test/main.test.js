const index = require('../src/index.js');

const rl = require('readline');
jest.mock('readline');

rl.createInterface.mockImplementation(() => {
    const result = { close: () => true };
    result[Symbol.asyncIterator] = () => { return { next: () => '*******************' } };
    return result;
});

const fs = require('fs');
jest.mock('fs');

fs.readFileSync.mockClear()
    .mockImplementationOnce(() => '{"access_token": "***********************"}');

const fetch = require('node-fetch');
jest.mock('node-fetch');

test('testing completed flow with gtoken.json', async () => {
    fetch.mockClear()
        .mockResolvedValueOnce({ json: () => require('./__mocks__/data/jira.retrieve.page-1.json') })
        .mockResolvedValueOnce({ json: () => require('./__mocks__/data/jira.retrieve.page-2.json') })
        .mockResolvedValueOnce({ json: () => require('./__mocks__/data/jira.get-epic-001.json') })
        .mockResolvedValueOnce({ json: () => require('./__mocks__/data/jira.get-epic-002.json') });
       
    const result = await index.main();
    expect(result).toBe(true);
});

test('testing completed flow without gtoken.json', async () => {
    fetch.mockClear()
        .mockResolvedValueOnce({ json: () => require('./__mocks__/data/jira.retrieve.page-1.json') })
        .mockResolvedValueOnce({ json: () => require('./__mocks__/data/jira.retrieve.page-2.json') })
        .mockResolvedValueOnce({ json: () => require('./__mocks__/data/jira.get-epic-001.json') })
        .mockResolvedValueOnce({ json: () => require('./__mocks__/data/jira.get-epic-002.json') });

    const result = await index.main();
    expect(result).toBe(true);
});
