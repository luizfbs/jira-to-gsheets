export function encode(input) {
  const buff = Buffer.from(input);
  const data = buff.toString('base64');
  return data;
}
