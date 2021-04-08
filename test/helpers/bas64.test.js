const helper = require('../../src/helpers/base64.js');

test('encode a string to base64', () => {
  const input = '123456';
  expect(helper.encode(input)).toBe('MTIzNDU2');
});
