import { Issue } from "@/components/projects/github/issue";
import { PullRequest } from "@/components/projects/github/pullRequest";
import { Loading } from "@/components/loading";
import { SetupGithubItegration } from "@/components/projects/github/setupGithubItegration";

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
    issues?.error === "No GitHub URL is set." ||
    prs?.error === "No GitHub URL is set."
  )
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">GitHub Integration</h1>
          <InfoModalButton
            heading={githubIntegration.heading}
            description={githubIntegration.description}
          />
        </div>

        <div className="w-[50%] flex flex-col gap-4  mx-auto mt-40">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-3xl font-bold text-center">GitHub Integration Missing</h2>
            <p className="text-gray-300 text-center w-[75%]">
              Submit your GitHub repository URL below to enable integration. You can change the URL at any time in the Settings tab.
            </p>
          </div>

          <div className="bg-[#2b313b] rounded-2xl shadow-xl px-6 py-8">
            <SetupGithubItegration setChangeIssues={setChangeIssues} />
          </div>
        </div>
      </div>
    );

  if (issues?.error != null) return <Error error={issues.error} />;
  if (prs?.error != null) return <Error error={prs.error} />;

  return (
    <div className="p-4 text-white">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">GitHub Integration</h1>
        <InfoModalButton
          heading={githubIntegration.heading}
          description={githubIntegration.description}
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        <Issue
          issues={issues}
          setChangeIssues={setChangeIssues}
          changeIssues={changeIssues}
        />
        <PullRequest prs={prs} />
      </div>
    </div>
  );
};
