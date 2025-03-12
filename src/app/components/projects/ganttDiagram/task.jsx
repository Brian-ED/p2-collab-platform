export const Task = ({ length, startDate }) => {
  length *= 3;
  startDate *= 3;
  return (
    <div className="h-[4vh] w-full flex items-center bg-white">
      <div
        className="bg-blue-600 rounded-lg h-[3vh]"
        style={{
          width: length + "vw",
          transform: "translateX(" + startDate + "vw)",
        }}
      ></div>
    </div>
  );
};
