import { useParams } from "next/navigation";

function sendGithubURL(pid, setChangeIssues) {
  const form = document.querySelector("#githubUrlForm");
  const data = new URLSearchParams(new FormData(form));

  fetch(`/api/github/setRepo?projectId=${pid}`, {
    method: "PATCH",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setChangeIssues(true);
    });
}

export const SetupGithubItegration = ({ setChangeIssues }) => {
  const { pid } = useParams();

  return (
    <form
      id="githubUrlForm"
      onSubmit={(e) => {
        e.preventDefault();
        sendGithubURL(pid, setChangeIssues);
      }}
      className="w-full flex flex-col sm:flex-row items-center gap-3"
    >
      <input
        type="url"
        name="github-repo"
        required
        placeholder="https://github.com/your/repo"
        className="w-full flex-1 px-4 py-2 rounded-lg bg-[#1f242d] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="submit"
        value="Integrate"
        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 cursor-pointer"
      />
    </form>
  );
};
