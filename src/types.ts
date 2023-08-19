export type InputParameter = {
  userName: string;
  isExcludeOwnerRepos: boolean;
  includedRepos: string[];
  excludedRepos: string[];
  states: string[];
  since: string;
  until: string;
  repoTemplate: string;
  itemTemplate: string;
  outputFilePath: string;
};

// Define the possible status values for Pull Requests
export type Status = "open" | "merged" | "closed";

// Define the options that can be used to customize the PR query
export type Options = {
  userName: string; // The username of the PR author
  isExcludeOwnerRepos?: boolean; // Whether to exclude PRs from repositories owned by the user
  includedRepos?: string[]; // List of repositories to include from the query
  excludedRepos?: string[]; // List of repositories to exclude from the query
  states?: Status[]; // List of PR states (open, merged, closed) to include in the query
};

export type Item = {
  [key: string]: any;
};

export type RepositoryData = {
  [repo: string]: Item[];
};
