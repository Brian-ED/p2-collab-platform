export const BoxedProject = ({title="MISSING", memberNames="MISSING", startDate="MISSING", onClick}) => {
  return (
    <button onClick={onClick} className="py-5 rounded-md bg-blue-500 hover:bg-blue-600 size-32">
      <div className="leading-10 whitespace-nowrap overflow-hidden overflow-ellipsis">{title}</div>
      <div className="text-[12px] leading-7 whitespace-nowrap overflow-hidden overflow-ellipsis">{memberNames}</div>
      <div className="text-[13.5px]/9 italic">{startDate}</div>
    </button>
  );
};
