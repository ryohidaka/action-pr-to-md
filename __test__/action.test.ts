import * as core from "@actions/core";
import { getInputParameter } from "../src/lib/action";

// Create a mock for core
jest.mock("@actions/core");

describe("getInputParameter", () => {
  beforeEach(() => {
    // Set up the mocked core.getInput
    (core.getInput as jest.Mock).mockReset();
  });

  it("should get input parameters", () => {
    // Set up necessary test data
    (core.getInput as jest.Mock).mockReturnValueOnce("test-user-name");
    (core.getBooleanInput as jest.Mock).mockReturnValueOnce(true);
    (core.getInput as jest.Mock).mockReturnValueOnce("test-excluded-repos");
    (core.getInput as jest.Mock).mockReturnValueOnce("test-states");
    (core.getInput as jest.Mock).mockReturnValueOnce("test-repo-template");
    (core.getInput as jest.Mock).mockReturnValueOnce("test-item-template");
    (core.getInput as jest.Mock).mockReturnValueOnce("test-output-file-path");

    const result = getInputParameter();

    expect(result).toEqual({
      userName: "test-user-name",
      isExcludeOwnerRepos: true,
      excludedRepos: ["test-excluded-repos"],
      states: ["test-states"],
      repoTemplate: "test-repo-template",
      itemTemplate: "test-item-template",
      outputFilePath: "test-output-file-path",
    });

    // Verify calls to core.getInput
    expect(core.getInput).toHaveBeenCalledWith("user_name", { required: true });
    expect(core.getBooleanInput).toHaveBeenCalledWith("is_exclude_owner_repos");
    expect(core.getInput).toHaveBeenCalledWith("excluded_repos");
    expect(core.getInput).toHaveBeenCalledWith("states");
    expect(core.getInput).toHaveBeenCalledWith("repo_template");
    expect(core.getInput).toHaveBeenCalledWith("item_template");
    expect(core.getInput).toHaveBeenCalledWith("output_file_path");
  });

  it("should handle error and return default values", () => {
    // Simulate an error message
    const errorMessage = "An error occurred";
    (core.getInput as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const result = getInputParameter();

    expect(result).toEqual({
      userName: "",
      isExcludeOwnerRepos: false,
      excludedRepos: [],
      states: [],
      repoTemplate: "",
      itemTemplate: "",
      outputFilePath: "",
    });

    // Verify that core.setFailed was called
    expect(core.setFailed).toHaveBeenCalledWith(errorMessage);
  });
});
