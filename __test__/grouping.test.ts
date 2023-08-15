import { groupPRsByRepository } from "../src/lib/grouping";

describe("groupPRsByRepository", () => {
  it("groups pull requests by repository", () => {
    const pullRequests = [
      {
        repository_url: "https://api.github.com/repos/user1/repo1",
        title: "PR 1",
      },
      {
        repository_url: "https://api.github.com/repos/user2/repo2",
        title: "PR 2",
      },
      {
        repository_url: "https://api.github.com/repos/user1/repo1",
        title: "PR 3",
      },
    ];

    const expectedGroups = {
      "user1/repo1": [
        {
          repository_url: "https://api.github.com/repos/user1/repo1",
          title: "PR 1",
        },
        {
          repository_url: "https://api.github.com/repos/user1/repo1",
          title: "PR 3",
        },
      ],
      "user2/repo2": [
        {
          repository_url: "https://api.github.com/repos/user2/repo2",
          title: "PR 2",
        },
      ],
    };

    const result = groupPRsByRepository(pullRequests);
    expect(result).toEqual(expectedGroups);
  });

  it("handles empty input", () => {
    const pullRequests: any[] = [];
    const result = groupPRsByRepository(pullRequests);
    expect(result).toEqual({});
  });

  it("handles missing repository_url", () => {
    const pullRequests = [
      {
        title: "PR 1",
      },
      {
        repository_url: "https://api.github.com/repos/user2/repo2",
        title: "PR 2",
      },
    ];

    const expectedGroups = {
      "user2/repo2": [
        {
          repository_url: "https://api.github.com/repos/user2/repo2",
          title: "PR 2",
        },
      ],
    };

    const result = groupPRsByRepository(pullRequests);
    expect(result).toEqual(expectedGroups);
  });
});
