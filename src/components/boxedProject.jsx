"use client";

export const BoxedProject = ({
  title = "MISSING",
  memberNames, // Example: [{id: 0, name: "" }]
  onClick,
}) => {
  const ellipses = "whitespace-nowrap overflow-hidden overflow-ellipsis";
  const names = memberNames.map((member) => (
    <div key={member.id} className={`${ellipses} text-[12px] leading-7`}>
      {member.name}
    </div>
  ));
  return (
    <button
      onClick={onClick}
      className="py-5 rounded-md bg-blue-600 hover:bg-blue-500 hover:cursor-pointer size-50"
    >
      <div className={`${ellipses} leading-10`}>{title}</div>
      {names}
    </button>
  );
};
