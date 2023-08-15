import { getPrsQuery } from "../src/lib/query";
import { Options } from "../src/types";

describe("getPrsQuery", () => {
  it("generates the correct query string", () => {
    const options: Options = {
      userName: "testuser",
      isExcludeOwnerRepos: true,
      excludedRepos: ["repo1", "repo2"],
      states: ["open", "closed"],
    };

    const query = getPrsQuery(options);

    expect(query).toEqual(
      "is:pr author:testuser -user:testuser -repo:repo1 -repo:repo2 is:open is:closed"
    );
  });

  it("generates the correct query string without exclusions and states", () => {
    const options: Options = {
      userName: "testuser",
    };

    const query = getPrsQuery(options);

    expect(query).toEqual("is:pr author:testuser");
  });

  it("generates the correct query string without excluded repositories", () => {
    const options: Options = {
      userName: "testuser",
      isExcludeOwnerRepos: true,
      states: ["merged"],
    };

    const query = getPrsQuery(options);

    expect(query).toEqual("is:pr author:testuser -user:testuser is:merged");
  });

  // Add more test cases as needed
});
