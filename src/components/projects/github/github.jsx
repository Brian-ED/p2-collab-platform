import { Issue } from "@/components/projects/github/issue";
import { PullRequest } from "@/components/projects/github/pullRequest";
import { SetupGithubItegration } from "@/components/projects/github/setupGithubItegration";
import { Loading } from "@/components/loading";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export const Github = () => {
  const [issues, setIssues] = useState(null);
  const [prs, setPrs] = useState(null);
  const [issuesLoading, setIssuesLoading] = useState(true);
  const [prsLoading, setPrsLoading] = useState(true);
  const [changeIssues, setChangeIssues] = useState(false);

  const { pid } = useParams();

  useEffect(() => {
    fetch(`/api/github/prs?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setPrs(data);
        setPrsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/github/issues?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
        setIssuesLoading(false);
      });
  }, [changeIssues]);

  if (issuesLoading || prsLoading) return <Loading />;

  if (
    issues.error === "No GitHub URL is set." ||
    prs.error === "No GitHub URL is set."
  )
    return (
      <div className="flex flex-col h-[80%]">
        <h1 className="mx-auto mt-20 text-2xl font-semibold">
          Looks like you haven&apos;t turned on GitHub Integration yet...
        </h1>
        <h1 className="mx-auto mt-10 text-xl">
          Enable GitHub Integration here:
        </h1>
        <SetupGithubItegration />
      </div>
    );

  if (issues.error != null) return <h1>Error: {issues.error}</h1>;
  if (prs.error != null) return <h1>Error: {prs.error}</h1>;

  return (
    <div className="flex flex-row w-full gap-8">
      <Issue issues={issues} setChangeIssues={setChangeIssues} />
      <PullRequest prs={prs} />
    </div>
  );
};
