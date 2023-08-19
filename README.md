# Action PR to Md

Action to output a list of PRs to a Markdown file.

## Usage

1. Add a comment `<!-- PR-LIST:START --><!-- PR-LIST:END -->` at the point where you want to insert the markdown file。

```md
# PR

<!-- PR-LIST:START -->
<!-- PR-LIST:END -->
```

2. Add workflows

```yml
- name: Action PR to Md
  uses: ryohidaka/action-pr-to-md@v1
  with:
    user_name: "user_name"
    is_exclude_owner_repos: false
    states: "open, merged, closed"
    excluded_repos: "excluded_repo1, excluded_repo2"
    since: "2020-01-01"
    until: "2023-01-01"
    repo_template: "- {REPO}\n{ITEMS}"
    item_template: "\t- [#{number} {title}]({url})"
    output_file_path: "output.md"
```

## Inputs

### `user_name`

**Required** The username to fetch pull requests.

### `is_exclude_owner_repos`

**Optional** Exclude repositories owned by the user.

### `included_repos`

**Optional** Comma-separated list of included repository names.

### `excluded_repos`

**Optional** Comma-separated list of excluded repository names.

### `states`

**Optional** Comma-separated list of PR states (`open, merged, closed`).

### `since`

**Optional** Filters data after to the specified date. (ex.`2020-01-01`).

### `until`

**Optional** Filters data prior to the specified date. (ex.`2020-01-01`).

### `repo_template`

**Optional** Template for repository section.

### `item_template`

**Optional** Template for individual item sections.

### `output_file_path`

**Optional** Path to the output markdown file.

## Template Variables

See [response to list pull requests](https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-pull-requests).

## Copyright and License

© 2023 ryohidaka under the [MIT license](LICENSE.md).
