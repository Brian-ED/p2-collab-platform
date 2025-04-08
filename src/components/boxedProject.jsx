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
        <div className="whitespace-nowrap overflow-hidden leading-10">
          {title}
        </div>
        Members:
        <div className="flex flex-col">
          {memberNames.slice(0, 3).map(({ id, name }) => (
            <p
              key={id}
              className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[12px] max-w-40 mx-auto"
            >
              {""===name? "Non-named User": name}
            </p>
          ))}
        </div>
        {memberNames.length > 3 ? <>...</> : <></>}
      </div>
    </button>
  );
};
