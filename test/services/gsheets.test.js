const service = require('../../src/services/gsheets.js');

const cliProgress = require('cli-progress');
const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const rl = require('readline');
jest.mock('readline');

rl.createInterface.mockImplementation(() => {
    const result = { close: () => true };
    result[Symbol.asyncIterator] = () => { return { next: () => '*******************' } };
    return result;
});

const fs = require('fs');
jest.mock('fs');

test('get token to Google Sheets', async () => {
  const result = await service.authorize();
  expect(result.generateAuthUrl()).toBe('https://google.com/path/to/get/token');
});

test('save data to Google Sheets', async () => {
  fs.readFileSync.mockClear()
    .mockImplementationOnce(() => '{"access_token": "***********************"}');
    
  const result = await service.save(progress, []);
  expect(result).toBe(true);
});
