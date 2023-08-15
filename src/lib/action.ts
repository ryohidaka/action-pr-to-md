import * as core from "@actions/core";
import { InputParameter } from "../types";

/**
 * Retrieves input parameters for the action.
 *
 * @returns {InputParameter} An object containing templatePath and srcDir obtained from action inputs.
 */
export const getInputParameter = (): InputParameter => {
  try {
    // Retrieve user input parameters
    const userName = core.getInput("user_name", { required: true });
    const isExcludeOwnerRepos =
      core.getBooleanInput("is_exclude_owner_repos") || false;
    const excludedReposRaw = core.getInput("excluded_repos") || "";
    const excludedRepos = excludedReposRaw
      .split(",")
      .map((item) => item.trim());
    const statesRaw = core.getInput("states") || "";
    const states = statesRaw.split(",").map((item) => item.trim());

    // Retrieve template inputs
    const repoTemplate = core.getInput("repo_template") || "- {REPO}\n{ITEMS}";
    const itemTemplate =
      core.getInput("item_template") || "\t- [#{number} {title}]({url})";

    const outputFilePath = core.getInput("output_file_path") || "output.md";

    // Return the retrieved input parameters
    return {
      userName,
      isExcludeOwnerRepos,
      excludedRepos,
      states,
      repoTemplate,
      itemTemplate,
      outputFilePath,
    };
  } catch (error: any) {
    // Handle error and return default values
    core.setFailed(error.message);
    return {
      userName: "",
      isExcludeOwnerRepos: false,
      excludedRepos: [],
      states: [],
      repoTemplate: "",
      itemTemplate: "",
      outputFilePath: "",
    };
  }
};
