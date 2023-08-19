import * as core from "@actions/core";
import { InputParameter } from "../types";
import simpleGit, { SimpleGit } from "simple-git";
import fs from "fs";

/**
 * Retrieves input parameters for the action.
 *
 * @returns {InputParameter} An object containing templatePath and srcDir obtained from action inputs.
 */
export const getInputParameter = (): InputParameter => {
  try {
    // Retrieve user input parameters

    // The username to fetch pull requests
    const userName = core.getInput("user_name", { required: true });

    // Exclude repositories owned by the user
    const isExcludeOwnerRepos =
      core.getBooleanInput("is_exclude_owner_repos") || false;

    // List of excluded repository names
    const excludedReposRaw = core.getInput("excluded_repos") || "";
    const excludedRepos = excludedReposRaw
      .split(",")
      .map((item) => item.trim());

    // list of PR states
    const statesRaw = core.getInput("states") || "";
    const states = statesRaw.split(",").map((item) => item.trim());

    // Retrieve template inputs
    const repoTemplate = core.getInput("repo_template") || "- {REPO}\n{ITEMS}";
    const itemTemplate =
      core.getInput("item_template") || "\t- [#{number} {title}]({url})";

    // Path to the output markdown file
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

/**
 * Writes markdown content to a file and commits it using Git.
 * @param path - The path to the file where markdown content will be written.
 * @param markdownContent - The markdown content to be written to the file.
 */
export const outputAndCommitMarkdown = (
  path: string,
  markdownContent: string
) => {
  try {
    // Configure Git user
    const git: SimpleGit = simpleGit();
    git.addConfig(
      "user.email",
      "41898282+github-actions[bot]@users.noreply.github.com"
    );
    git.addConfig("user.name", "github-actions[bot]");

    // Write markdown content to a file
    fs.writeFileSync(path, markdownContent);

    core.info(`Commiting: ${path}`);

    // Commit the markdown file
    git.add(path);
    git.commit(`Update ${path}`, path, (error) => {
      if (error) {
        core.setFailed(`Error committing markdown file: ${error}`);
      } else {
        core.info("Markdown file committed successfully.");
      }
    });
  } catch (error) {
    core.setFailed(`Error committing markdown file: ${error}`);
  }
};
