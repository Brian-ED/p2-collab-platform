import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGithubUrl } from "@/lib/queries";

export const Issue = (repo) => {
  const [issues, setIssues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [changeTask, setChangeTask] = useState(false);

  const { pid } = useParams();

  useEffect(() => {
    fetch(`/api/github/issues?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
        setIsLoading(false);
      });
  }, [changeTask]);

  return <div></div>;
};
