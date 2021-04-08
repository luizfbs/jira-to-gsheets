const formatter = require('../../src/formatters/date.js');

test('pass null or invalid date to locale', () => {
  expect(formatter.toLocale(null)).toBe('');
});

test('format date to a brazilian localed date string', () => {
  const date = new Date(2021, 3, 7);
  expect(formatter.toLocale(date)).toBe('07/04/2021');
});

test('pass null or invalid date to calculate date diff', () => {
  expect(formatter.calculateDiff(null, null)).toBe('');
});

test('calculate the days difference between date1 and date2', () => {
  const date1 = new Date(2021, 3, 7);
  const date2 = new Date(2021, 3, 1);
  expect(formatter.calculateDiff(date1, date2)).toBe(6);
});

test('format date to a named cycle', () => {
  const date = new Date(2021, 3, 7);
  expect(formatter.toCycle(date)).toBe('S1/2021');
});
