import { FaCheck, FaPlus, FaX } from "react-icons/fa6";

import dayjs from "dayjs";
import markdownit from "markdown-it";
import parse from "html-react-parser";
import { useParams } from "next/navigation";
import { useEffect, useReducer } from "react";

const md = markdownit();

function reducer(state, action) {
  switch (action.type) {
    case "SET_ISSUES":
      return {
        ...state,
        data: {
          ...state.data,
          issues: state.data.issues.map((issue) => {
            return { ...issue, isAdded: null };
          }),
        },
      };
    case "UPDATE_ISSUE_STATUS":
      return {
        ...state,
        data: {
          ...state.data,
          issues: state.data.issues.map((issue, index) => {
            if (index === action.payload.index) {
              return { ...issue, isAdded: action.payload.success };
            }
            return issue;
          }),
        },
      };
    default:
      return state;
  }
}

export const Issue = ({ issues, setChangeIssues, changeIssues }) => {
  const [issuesState, dispatch] = useReducer(reducer, issues);

  useEffect(() => {
    dispatch({ type: "SET_ISSUES" });
  }, [changeIssues]);

  const { pid } = useParams();

  async function addToKanban(title) {
    let data = new FormData();
    data.append("kanban-name", title);
    data.append("kanban-description", "");
    data.append("kanban-status", "backlog");

    data = new URLSearchParams(data);

    let result = await fetch(`/api/db/handleKanban?projectId=${pid}`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    result = await result.json();

    return result.error === null;
  }

  return (
    <div className="w-[50%] flex flex-col *:nth-of-type-[n+2]:mt-10 mb-5">
      <h1 className="text-4xl text-center mb-5">Issues</h1>
      {issuesState.data.issues.map((issue, index) => (
        <div key={issue.id} className="relative">
          <div className="flex flex-row bg-white rounded-md min-h-15 py-2">
            <img
              src={issue.user.avatar_url}
              className="rounded-full size-10 my-auto mx-4"
            />
            <div className="flex flex-col gap-2">
              <a
                href={issue.html_url}
                target="_blank"
                className="text-lg text-black underline-offset-8 font-semibold hover:underline"
              >
                {`#${
                  new URL(issue.html_url).pathname.split("/").reverse()[0]
                } ${issue.title}`}
              </a>
              <div className="text-black mb-5">
                {issue.body == null ? "" : parse(md.render(issue.body))}
              </div>
            </div>
            <button
              className={`text-black scale-150 ${
                issue.isAdded === null
                  ? "bg-blue-400"
                  : issue.isAdded
                  ? "bg-green-400"
                  : "bg-red-400"
              } w-fit h-fit rounded-sm absolute left-3 top-3 hover:cursor-pointer`}
              onClick={async () => {
                const success = await addToKanban(
                  `#${
                    new URL(issue.html_url).pathname.split("/").reverse()[0]
                  } ${issue.title}`
                );

                dispatch({
                  type: "UPDATE_ISSUE_STATUS",
                  payload: { index, success },
                });
              }}
            >
              {issue.isAdded === null ? (
                <FaPlus />
              ) : issue.isAdded ? (
                <FaCheck />
              ) : (
                <FaX />
              )}
            </button>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {issuesState.data.comments
              .filter(
                (comment) =>
                  new URL(comment.html_url).pathname ==
                  new URL(issue.html_url).pathname
              )
              .reverse()
              .map((comment) => (
                <div
                  key={comment.id}
                  className="flex flex-row bg-white rounded-md min-h-10 py-1"
                >
                  <img
                    src={comment.user.avatar_url}
                    className="rounded-full size-8 my-auto mx-4"
                  />
                  <div className="flex flex-col">
                    <div className="my-auto text-black">
                      {comment.body == null
                        ? ""
                        : parse(md.render(comment.body))}
                    </div>
                    <p className="text-black mt-1 text-sm">
                      {dayjs(comment.updated_at).format("HH:mm DD/MM/YYYY")}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
