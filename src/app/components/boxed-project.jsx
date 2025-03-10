export const BoxedProject = ({title="MISSING", memberNames="MISSING", startDate="MISSING", onClick}) => {
  
  return (
    <button onClick={onClick} className="py-5 rounded-md bg-blue-500 hover:bg-blue-600 size-32">
      <div>{title}</div>
      <div>{memberNames}</div>
      <div>{startDate}</div>
    </button>
  );
};
