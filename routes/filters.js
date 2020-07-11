module.exports.applyFilters = (queries, entriesInRange) => {
  const filters = Object.entries(queries)
    .filter(([key, val]) => val !== 'false')
    .filter(([key]) => key !== 'range');

  const filtersFns = {
    losts: (entries) => (e) => e.entryType === 'lost',
    founds: (entries) => (e) => e.entryType === 'found',
    labels: (entries, val) => {
      const activeLabels = new Set(val.split(','));
      return (e) => e.labels.some((l) => activeLabels.has(l));
    },
    user_entries: (entries, val) => (e) => e.reporter.id == val,
  };
  let filteredEntries = entriesInRange;
  filters.forEach(([activeFilter, val]) => {
    filteredEntries = filteredEntries.filter(
      filtersFns[activeFilter](entriesInRange, val)
    );
  });

  return filteredEntries;
};
