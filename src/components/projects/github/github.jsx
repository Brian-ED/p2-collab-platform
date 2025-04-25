import { Issue } from "@/components/projects/github/issue";
import { PullRequest } from "@/components/projects/github/pullRequest";
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

  return (
    <div className="flex flex-row w-full gap-8">
      <Issue issues={issues} setChangeIssues={setChangeIssues} />
      <PullRequest prs={prs} />
    </div>
  );
};
