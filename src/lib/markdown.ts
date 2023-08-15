import { Item, RepositoryData } from "../types";
import fs from "fs";
import { readFile } from "fs/promises";

/**
 * Replaces variables in a template with corresponding values from data.
 * Supports nested objects.
 * @param template - Template string containing variables to be replaced.
 * @param data - Data object containing key-value pairs for replacement.
 * @returns The template string with variables replaced by values.
 */
const replaceVariables = (template: string, data: Item): string => {
  let result = template;

  for (const key in data) {
    const value = data[key];

    if (typeof value === "object") {
      result = replaceVariables(result, value);
    } else {
      const regex = new RegExp(`{${key}}`, "gi");
      result = result.replace(regex, value);
    }
  }

  return result;
};

/**
 * Generates markdown content based on the provided data and templates.
 * @param data - Repository data with items to be included in the markdown.
 * @param repoTemplate - Template for the repository section.
 * @param itemTemplate - Template for individual item sections.
 * @returns Complete markdown content.
 */
export const generateFullMarkdown = (
  data: RepositoryData,
  repoTemplate: string,
  itemTemplate: string
): string => {
  return Object.entries(data)
    .map(([repo, items]) => {
      const itemsMarkdown = items
        .map((item) => replaceVariables(itemTemplate, item))
        .join("\n");
      return replaceVariables(repoTemplate, {
        REPO: repo,
        ITEMS: itemsMarkdown,
      });
    })
    .join("\n");
};

/**
 * Retrieves the content of a file located at the specified path.
 *
 * @param {string} path - The path to the file.
 * @returns {Promise<string>} The content of the file as a string.
 * @throws {Error} If there is an error reading the file.
 */
const getTemplateFile = async (path: string): Promise<string> => {
  try {
    // Read the content of the file asynchronously
    const data = await readFile(path, "utf8");
    return data;
  } catch (err) {
    throw new Error(`Error reading file: ${path}`);
  }
};

/**
 * Inserts markdown content between specified start and end comment markers in a template file.
 * @param path - The path to the template file.
 * @param markdownContent - The markdown content to be inserted.
 */
export const insert = async (path: string, markdownContent: string) => {
  // Define the start and end comment markers
  const startComment = "<!-- PR-LIST:START -->";
  const endComment = "<!-- PR-LIST:END -->";

  const templateContent = await getTemplateFile(path);

  // Find the indices of the start and end comment markers
  const startIdx = templateContent.indexOf(startComment);
  const endIdx = templateContent.indexOf(endComment) + endComment.length;

  // Check if both start and end comments are found
  if (startIdx !== -1 && endIdx !== -1) {
    // Insert the markdown content between the comments
    const updatedTemplate =
      templateContent.substring(0, startIdx + startComment.length) +
      "\n" +
      markdownContent +
      "\n" +
      templateContent.substring(endIdx) +
      endComment;

    // Write the updated template back to the file
    fs.writeFileSync(path, updatedTemplate, "utf-8");
  } else {
    // Print an error message if comments are not found
    console.error("Start or end comment not found in template file.");
  }
};
