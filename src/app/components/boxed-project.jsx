function cap(text, max) {
  if (max<text.length){
    text = text.slice(0, max-3)+"..."
  }
  return text
}

export const BoxedProject = ({title="MISSING", memberNames="MISSING", startDate="MISSING", onClick}) => {
  const maxLineLength = 17;
  memberNames = cap(memberNames, maxLineLength);
  startDate   = cap(startDate  , maxLineLength);
  title       = cap(title      , maxLineLength);

  return (
    <button onClick={onClick} className="py-5 rounded-md bg-blue-500 hover:bg-blue-600 size-32">
      <div>{title}</div>
      <div>{memberNames}</div>
      <div>{startDate}</div>
    </button>
  );
};
