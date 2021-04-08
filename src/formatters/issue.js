export function isBlocked(flagged) {
  if (flagged?.find((e) => e.value === 'Impediment')) return 'YES';
  return '';
}

export function toEpicName(epic, epics) {
  if (!epic || !epics.find((e) => e.key === epic)) return '';
  return `[${epic}] ${epics.find((e) => e.key === epic).fields?.summary}`;
}
