import { Octokit } from "@octokit/rest";
import { Options } from "../types";
import { getPrsQuery } from "./query";
import fetch from "node-fetch";

// Create an Octokit instance
// @see: https://github.com/octokit/octokit.js/#fetch-missing
const octokit = new Octokit({
  request: {
    fetch: fetch,
  },
});

/**
 * Function to retrieve Pull Requests
 * @param {Options} options - Options for the pull requests
 * @returns {Promise<any[]>} - Array of pull requests
 */
export const getPrs = async (options: Options): Promise<any[]> => {
  try {
    // Generate the query
    const query = getPrsQuery(options);

    // Request GitHub API to fetch pull requests
    const { data } = await octokit.request("GET /search/issues", {
      q: query,
      per_page: 100,
    });

    return data.items;
  } catch (error: any) {
    console.error("Error:", error.message);
    return [];
  }
};
