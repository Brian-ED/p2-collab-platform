import { auth } from "@/auth/authSetup";
import { App } from "octokit";
import {
  checkIfUserHasAccessToProject,
  checkIfUserOwnsProject,
  getGithubUrl,
} from "@/lib/queries";

export async function GET(req) {
  const searchparams = new URL(req.url).searchParams;
  let projectId = searchparams.get("projectId");

  projectId = parseInt(projectId);

  const session = await auth();
  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess =
      (await checkIfUserOwnsProject(session, projectId)) ||
      (await checkIfUserHasAccessToProject(session, projectId));
  }

  if (!!session && userHasAccess) {
    let githuburl;
    try {
      githuburl = new URL(await getGithubUrl(projectId));
    } catch {
      return Response.json({ data: null, error: "No GitHub URL is set." });
    }
    const [owner, repo] = githuburl.pathname.split("/").slice(1);

    try {
      const app = new App({
        appId: Number(process.env.APP_ID),
        privateKey: process.env.APP_PRIVATE_KEY,
        oauth: {
          clientId: process.env.AUTH_GITHUB_ID,
          clientSecret: process.env.AUTH_GITHUB_SECRET,
        },
      });

      const installationId = process.env.APP_INSTALL_ID;

      const octokit = await app.getInstallationOctokit(installationId);

      const issues = await octokit.request(
        `GET /repos/${owner}/${repo}/issues`,
        {
          owner: owner,
          repo: repo,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      const comments = await octokit.request(
        `GET /repos/${owner}/${repo}/issues/comments`,
        {
          owner: owner,
          repo: repo,
          direction: "desc",
          per_page: 100,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      return Response.json({
        data: {
          issues: issues.data.filter((issue) => issue.pull_request == null),
          comments: comments.data,
        },
        error: null,
      });
    } catch (error) {
      console.error("GitHub API Error:", error);
      return Response.json({ data: null, error: "GitHub API error" });
    }
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
