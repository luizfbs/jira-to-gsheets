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

  for (let i = 0; i < sequence.length; i += 1) {
    if (sequence[i] === actual) {
      // issue in this status already
      for (let x = i + 1; x < sequence.length; x += 1) {
        status[sequence[x]] = undefined; // clean these dates
      }
      break;
    }
    if (!status[sequence[i]]) {
      for (let x = i + 1; x < sequence.length; x += 1) {
        // issue is in a bigger status, but skipped some columns
        if (status[sequence[x]]) {
          status[sequence[i]] = status[sequence[x]]; // fulfill these dates
          break;
        }
      }
    }
  }

  return status;
}

export function parse(issue) {
  const { histories } = issue.changelog;
  const status = {};

  status.Created = new Date(issue.fields.created);
  for (let i = 0; i < histories.length; i += 1) {
    const item = histories[i].items.find((e) => e.field === 'status');
    status[item?.toString] = new Date(histories[i].created);
  }

  return fillEmptyDates(status, issue?.fields?.status?.name);
}
