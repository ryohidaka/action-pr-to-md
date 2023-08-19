import { getInputParameter, outputAndCommitMarkdown } from "./lib/action";
import { getPrs } from "./lib/github";
import { groupPRsByRepository } from "./lib/grouping";
import { generateFullMarkdown, insert } from "./lib/markdown";
import { Options, Status } from "./types";

async function run() {
  // Get input parameters from action inputs.
  const {
    userName,
    isExcludeOwnerRepos,
    excludedRepos,
    states,
    repoTemplate,
    itemTemplate,
    outputFilePath,
  } = getInputParameter();

  // Prepare options for fetching PRs.
  const options: Options = {
    userName,
    isExcludeOwnerRepos,
    excludedRepos,
    states: states as Status[],
  };

  // Fetch PRs based on the provided options.
  const prs = await getPrs(options);

  // Group fetched PRs by repository.
  const groupedPrs = groupPRsByRepository(prs);

  // Generate markdown content based on the grouped PRs.
  const mdData = generateFullMarkdown(groupedPrs, repoTemplate, itemTemplate);

  // Inserts markdown content between specified start and end comment markers in a template file.
  await insert(outputFilePath, mdData);
}

void run();
