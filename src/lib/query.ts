import { Options } from "../types";

/**
 * Generate the query string for retrieving Pull Requests based on options.
 * @param {Options} options - Options for generating the query.
 * @returns {string} - Generated query string.
 */
export const getPrsQuery = (options: Options): string => {
  const userName = options.userName;
  const isExcludeOwnerRepos = options.isExcludeOwnerRepos;
  const excludedRepos = options.excludedRepos;
  const states = options.states;

  // Initialize the base query with the author's username
  let query = `is:pr author:${userName}`;

  // If excluding owner's repositories, add exclusion
  if (isExcludeOwnerRepos) {
    query += ` -user:${userName}`;
  }

  // If excluded repositories are specified, add their exclusion
  if (excludedRepos && excludedRepos.length > 0) {
    const excludedQuery = excludedRepos
      .map((repo) => `-repo:${repo}`)
      .join(" ");
    query += ` ${excludedQuery}`;
  }

  // If states are specified, add them to the query
  if (states && states.length > 0) {
    const stateQuery = states
      .map((state) => `is:${state.toLowerCase()}`)
      .join(" ");
    query += ` ${stateQuery}`;
  }

  console.log(`Query: ${query}`);

  return query;
};
