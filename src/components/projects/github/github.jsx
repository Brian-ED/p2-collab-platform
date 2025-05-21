import { Issue } from "@/components/projects/github/issue";
import { PullRequest } from "@/components/projects/github/pullRequest";
import { SetupGithubItegration } from "@/components/projects/github/setupGithubItegration";
import { Loading } from "@/components/loading";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { InfoModalButton } from "@/components/projects/infoModalButton";
import { Error } from "@/components/error";
import { githubIntegration } from "@/lib/tutorial.json";

export const Github = () => {
  const [issues, setIssues] = useState(null);
  const [prs, setPrs] = useState(null);
  const [issuesLoading, setIssuesLoading] = useState(true);
  const [prsLoading, setPrsLoading] = useState(true);
  const [changeIssues, setChangeIssues] = useState(false);

  const { pid } = useParams();

  useEffect(() => {
    setPrsLoading(true);
    fetch(`/api/github/prs?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setPrs(data);
        setPrsLoading(false);
      });
  }, [changeIssues]);

  useEffect(() => {
    setIssuesLoading(true);
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
      <>
        <div className="flex justify-between">
          <InfoModalButton
            heading={githubIntegration.heading}
            description={githubIntegration.description}
          />
        </div>
        <div className="flex flex-col h-[80%]">
          <h1 className="mx-auto mt-20 text-2xl font-semibold">
            Looks like you haven&apos;t turned on GitHub Integration yet...
          </h1>
          <h1 className="mx-auto mt-10 text-xl">
            Enable GitHub Integration by submitting your GitHub repository URL
            below:
          </h1>
          <h1 className="mx-auto mt-1 text-sm">
            The GitHub repository URL can be changed in the settings tab at any
            time.
          </h1>
          <SetupGithubItegration setChangeIssues={setChangeIssues} />
        </div>
      </>
    );

  if (issues.error != null) return <Error error={issues.error} />;
  if (prs.error != null) return <Error error={prs.error} />;

  return (
    <>
      <div className="flex justify-between">
        <InfoModalButton
          heading={githubIntegration.heading}
          description={githubIntegration.description}
        />
      </div>
      <div className="flex flex-row w-full gap-8">
        <Issue
          issues={issues}
          setChangeIssues={setChangeIssues}
          changeIssues={changeIssues}
        />
        <PullRequest prs={prs} />
      </div>
    </>
  );
};
