export function fillEmptyDates(oldStatus, actual) {
  const status = oldStatus;
  const sequence = [
    'Created',
    'Ready to Do',
    'Doing',
    'Code Review',
    'Ready 4 Tests',
    'Acceptance Testing',
    'Fixing',
    'Ready to merge',
    'Ready To Deploy',
    'Done',
  ];

  sequence.map((name, i, arr) => {
    const others = arr.slice(i + 1);
    if(name === actual) {
      others.map((x) => status[x] = undefined);
      return;
    }
    status[name] = status[name] || status[others.find(x => status[x] ? status[x] : undefined)];
  });

  return status;
}

export function parse(issue) {
  const { histories } = issue.changelog;
  const status = {};

  status.Created = new Date(issue.fields.created);
  histories.map((history) => {
    const item = history.items.find((item) => item.field === 'status');
    status[item?.toString] = new Date(history.created);
  });

  return fillEmptyDates(status, issue?.fields?.status?.name);
}
