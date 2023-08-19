import { filterDataByDateRange } from "../src/lib/filter";

describe("filterDataByDateRange", () => {
  // Sample data for testing
  const testData = [
    { created_at: "2023-08-15T12:00:00Z" },
    { created_at: "2023-08-17T15:30:00Z" },
    { created_at: "2023-08-19T08:45:00Z" },
    { created_at: "2023-08-21T18:20:00Z" },
  ];

  it("should filter data within the specified date range", () => {
    const since = "2023-08-16T00:00:00Z";
    const until = "2023-08-20T23:59:59Z";

    const filteredData = filterDataByDateRange(testData, since, until);

    expect(filteredData).toHaveLength(2);
    expect(filteredData).toEqual([
      { created_at: "2023-08-17T15:30:00Z" },
      { created_at: "2023-08-19T08:45:00Z" },
    ]);
  });

  it("should include all data when no date range is specified", () => {
    const filteredData = filterDataByDateRange(testData);

    expect(filteredData).toHaveLength(4);
    expect(filteredData).toEqual(testData);
  });

  it("should handle cases where only one end of the date range is specified", () => {
    const since = "2023-08-18T00:00:00Z";

    const filteredData = filterDataByDateRange(testData, since);

    expect(filteredData).toHaveLength(2);
    expect(filteredData).toEqual([
      { created_at: "2023-08-19T08:45:00Z" },
      { created_at: "2023-08-21T18:20:00Z" },
    ]);
  });

  // Add more test cases as needed
});
