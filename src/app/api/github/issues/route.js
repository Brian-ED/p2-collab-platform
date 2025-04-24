import { auth } from "@/auth/authSetup";
import { App } from "octokit";
import {
  checkIfUserHasAccessToProject,
  checkIfUserOwnsProject,
  getAppInstallationId,
} from "@/lib/queries";

export async function GET(req) {
  const searchparams = new URL(req.url).searchParams;
  let projectId = searchparams.get("projectId");
  const githuburl = new URL(searchparams.get("githuburl"));
  const [owner, repo] = githuburl.pathname.split("/").slice(1);

  projectId = parseInt(projectId);

  const session = await auth();
  let userHasAccess = false;
  if (Number.isInteger(projectId)) {
    userHasAccess =
      (await checkIfUserOwnsProject(session, projectId)) ||
      (await checkIfUserHasAccessToProject(session, projectId));
  }

  if (!!session && userHasAccess) {
    try {
      const app = new App({
        appId: Number(process.env.APP_ID),
        privateKey: process.env.APP_PRIVATE_KEY,
        oauth: {
          clientId: process.env.AUTH_GITHUB_ID,
          clientSecret: process.env.AUTH_GITHUB_SECRET,
        },
      });

      const installationId = await getAppInstallationId(projectId);

      if (installationId === -1)
        return Response.json({
          data: null,
          error: "No Github App Installation id found.",
        });

      const octokit = await app.getInstallationOctokit(installationId);

      const response = await octokit.request(
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
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      return Response.json({
        response: response.data,
        comments: comments.data,
      });
    } catch (error) {
      console.error("GitHub API Error:", error);
      return Response.json({ error: "GitHub API error" });
    }
  } else {
    return Response.json({ data: null, error: "Not authorized" });
  }
}
