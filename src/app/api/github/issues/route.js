// pages/api/github/issues.ts
import { App } from "octokit";

export async function GET(req) {
  try {
    const app = new App({
      appId: Number(process.env.APP_ID),
      privateKey: process.env.APP_PRIVATE_KEY,
      oauth: {
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
      },
    });

    const octokit = await app.getInstallationOctokit(65132728); // TODO: Pass installation ID with req

    const response = await octokit.request(
      "GET /repos/Brian-ED/p2-collab-platform/issues",
      {
        owner: "Brian-ED",
        repo: "p2-collab-platform",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    const response2 = await octokit.request(
      "GET /repos/Brian-ED/p2-collab-platform/issues/comments",
      {
        owner: "Brian-ED",
        repo: "p2-collab-platform",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    return Response.json(response.data[0].body);
  } catch (error) {
    console.error("GitHub API Error:", error);
    return Response.json({ error: "GitHub API error" });
  }
}
