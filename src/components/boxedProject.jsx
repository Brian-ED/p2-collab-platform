"use client";

export const BoxedProject = ({
  title = "MISSING",
  memberNames, // Example: [{id: 0, name: "" }]
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="py-5 rounded-md bg-blue-600 hover:bg-blue-500 hover:cursor-pointer size-50"
    >
      <div className="h-full">
        <div className="whitespace-nowrap overflow-hidden overflow-ellipsi leading-10">
          {title}
        </div>
        Members:
        <div className="w-40">
          {memberNames.slice(0, 3).map(({ id, name }) => (
            <div
              key={id}
              className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[12px] leading-7"
            >
              {name +
                "abcdefghijklmenopopawokdpowefowejfijwwjefojfoeiwejfowjefoeifjwoiefjowef"}
            </div>
          ))}
        </div>
        {memberNames.length > 3 ? <>...</> : <></>}
      </div>
    </button>
  );
};
