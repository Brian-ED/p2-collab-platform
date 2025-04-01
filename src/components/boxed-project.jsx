"use client";

export const BoxedProject = ({
  title = "MISSING",
  memberNames = { 0: [{ id: 0, name: "" }] },
  onClick,
}) => {
  const ellipses = "whitespace-nowrap overflow-hidden overflow-ellipsis";
  return (
    <button
      onClick={onClick}
      className="py-5 rounded-md bg-blue-600 hover:bg-blue-500 hover:cursor-pointer size-50"
    >
      <div className={`${ellipses} leading-10`}>{title}</div>
      {memberNames[0].map((member) => (
        <div key={member.id} className={`${ellipses} text-[12px] leading-7`}>
          {member.name}
        </div>
      ))}
      {/* <div className="text-[13.5px]/9 italic">{startDate}</div> */}
    </button>
  );
};
