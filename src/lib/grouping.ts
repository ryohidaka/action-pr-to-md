/**
 * Groups an array of pull requests by repository.
 *
 * @param prs - Array of pull requests.
 * @returns Object containing pull request groups indexed by repository name.
 */
export const groupPRsByRepository = (prs: any[]): Record<string, any[]> => {
  return prs.reduce((prGroups, pr) => {
    if (pr.repository_url) {
      const repoName = pr.repository_url.split("/repos/")[1];
      (prGroups[repoName] ||= []).push(pr);
    }
    return prGroups;
  }, {});
};
