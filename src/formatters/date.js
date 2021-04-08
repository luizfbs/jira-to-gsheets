export function toLocale(input) {
  if (!input || input.getTime() === 0) return '';
  return input.toLocaleDateString('pt-BR');
}

export function calculateDiff(from, toParam) {
  if (!from) return '';
  const to = toParam || new Date();

  const diff = Math.abs(to - from);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function toCycle(date) {
  const half = Math.floor((date.getMonth() + 6) / 6);
  return `S${half}/${date.getFullYear()}`;
}
