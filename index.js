const core = require("@actions/core");
const github = require("@actions/github");
const { execFileSync } = require("child_process");

run().catch(error => {
  core.setFailed(error.message);
});

async function run() {
  const token = core.getInput("repo_token");

  const context = github.context;

  const octokit = new github.GitHub(token);

  const merge_base_sha = execFileSync(
    "git",
    ["merge-base", "HEAD^1", "HEAD^2"],
    { encoding: "utf8" }
  ).trim();

  console.log("Found merge base sha:", merge_base_sha);

  const { pull_request, repository } = context.payload;
  const { head, base } = pull_request;

  const summary = `
The [merge base](https://git-scm.com/docs/git-merge-base) for ${
    head.sha
  } (on [\`${head.label}\`](${repository.html_url})) and [\`${base.ref}\`](${
    repository.html_url
  }) was ${merge_base_sha}

This was calculated using the parents of ${context.sha} ([${context.ref}](${
    repository.html_url
  }/tree/${context.ref})), the auto-generated potential merge commit for PR ${
    pull_request.html_url
  }.
`;

  const result = await octokit.checks.create({
    ...context.repo,
    name: `sha:${context.payload.pull_request.base.ref}`,
    head_sha: context.payload.pull_request.head.sha,
    status: "completed",
    conclusion: "neutral",
    output: {
      title: "Merge base",
      summary,
      text: JSON.stringify({
        schema_version: 1,
        merge_base_sha
      })
    }
  });

  console.log("Added check run:", result.data.html_url);
}
