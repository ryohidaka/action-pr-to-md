/**
 * Filters an array of data by date range.
 *
 * @param data - The array of data to filter.
 * @param since - The start date of the date range (optional).
 * @param until - The end date of the date range (optional).
 * @returns An array of data items within the specified date range.
 */
export const filterDataByDateRange = (
  data: any[],
  since?: string,
  until?: string
): any[] => {
  // Log the date range being used for filtering.
  console.log(`Filter data: ${since}~${until}`);

  // Convert the string dates to Date objects.
  const sinceDate = since ? new Date(since) : null;
  const untilDate = until ? new Date(until) : null;

  /**
   * Filters a data item based on the specified date range.
   *
   * @param item - The data item to be filtered.
   * @returns True if the item is within the date range, false otherwise.
   */
  const filterByDateRange = (item: any): boolean => {
    const createdAt = new Date(item.created_at);
    const isAfterSinceDate = !sinceDate || createdAt >= sinceDate;
    const isBeforeUntilDate = !untilDate || createdAt <= untilDate;
    return isAfterSinceDate && isBeforeUntilDate;
  };

  // Apply the date range filter to the data array.
  return data.filter(filterByDateRange);
};
