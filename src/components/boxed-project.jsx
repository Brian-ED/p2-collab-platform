export const BoxedProject = ({title="MISSING", memberNames="MISSING", startDate="MISSING", onClick}) => {
  const ellipses = "whitespace-nowrap overflow-hidden overflow-ellipsis"
  return (
    <button onClick={onClick} className="py-5 rounded-md bg-blue-600 hover:bg-blue-500 size-32">
      <div className={`${ellipses} leading-10`}>{title}</div>
      <div className={`${ellipses} text-[12px] leading-7`}>{memberNames}</div>
      <div className="text-[13.5px]/9 italic">{startDate}</div>
    </button>
  );
};
