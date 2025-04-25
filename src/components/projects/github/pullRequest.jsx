import dayjs from "dayjs";
import markdownit from "markdown-it";
import parse from "html-react-parser";

const md = markdownit();

export const PullRequest = (prs) => {
  prs = prs.prs;

  return (
    <div className="w-[50%] flex flex-col *:nth-of-type-[n+2]:mt-10 mb-5">
      <h1 className="text-4xl text-center mb-5">Pull requests</h1>
      {prs.data.pull_requests.map((pr) => (
        <div key={pr.id}>
          <div className="flex flex-row bg-white rounded-md min-h-15 py-2">
            <img
              src={pr.user.avatar_url}
              className="rounded-full size-10 my-auto mx-4"
            />
            <div className="flex flex-col gap-2">
              <a
                href={pr.html_url}
                target="_blank"
                className="text-lg text-black underline-offset-8 font-semibold hover:underline"
              >
                {`#${new URL(pr.html_url).pathname.split("/").reverse()[0]} ${
                  pr.title
                }`}
              </a>
              <div className="text-black mb-5">{parse(md.render(pr.body))}</div>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {prs.data.comments
              .filter(
                (comment) =>
                  new URL(comment.html_url).pathname ==
                  new URL(pr.html_url).pathname
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
                      {parse(md.render(comment.body))}
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
