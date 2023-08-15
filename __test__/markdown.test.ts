import { generateFullMarkdown } from "../src/lib/markdown";

describe("generateFullMarkdown function", () => {
  it("generates correct markdown content", () => {
    const data = {
      "AranoYuki1/Misstter": [
        {
          title: "misster1",
          number: 1,
        },
        {
          title: "misster2",
          number: 2,
        },
      ],
      "AnotherUser/AnotherRepo": [
        {
          title: "another",
          url: "url",
        },
      ],
    };

    const repoTemplate = "- {REPO}\n{ITEMS}";
    const itemTemplate = "\t- {title} {number} {url}";

    const expectedOutput = `
- AranoYuki1/Misstter
\t- misster1 1 {url}
\t- misster2 2 {url}
- AnotherUser/AnotherRepo
\t- another {number} url 
`.trim();

    const result = generateFullMarkdown(
      data,
      repoTemplate,
      itemTemplate
    ).trim();
    expect(result).toBe(expectedOutput);
  });
});
