import { Item, RepositoryData } from "../types";

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
