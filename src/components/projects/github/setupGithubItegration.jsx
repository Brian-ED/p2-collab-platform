import { useParams } from "next/navigation";

function sendGithubURL(pid, setChangeIssues) {
  const data = new URLSearchParams(
    new FormData(document.querySelector("#githubUrlForm"))
  );

  fetch(`/api/github/setRepo?projectId=${pid}`, {
    method: "PATCH",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      setChangeIssues(true);
    });
}

export const SetupGithubItegration = ({ setChangeIssues }) => {
  const { pid } = useParams();

  return (
    <form
      className="mx-auto mt-5 flex flex-col"
      id="githubUrlForm"
      action={() => {
        sendGithubURL(pid, setChangeIssues);
      }}
    >
      <input
        type="url"
        name="github-repo"
        className="border-2 rounded-md w-100 text-center"
        placeholder="GitHub Repository URL"
      />
      <input
        type="submit"
        value="Integrate GitHub"
        className="bg-white px-2 border-2 border-black text-black rounded-md hover:cursor-pointer mt-2 w-fit mx-auto"
      />
    </form>
  );
};
