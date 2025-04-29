"use client";

export const SetupTask = (props) => {
  const clampedProgress = Math.min(props.progress, props.requiredAmount);
  const isComplete = clampedProgress >= props.requiredAmount;

  return (
    <div
      className={`flex justify-between items-center border p-4 my-4 rounded-lg transition-all duration-300 ${
        isComplete
          ? "bg-green-100 border-green-400 text-green-800 shadow-md"
          : "bg-transparent border-white text-white"
      }`}
    >
      <div className="flex gap-2 items-center">
        {isComplete && "✅"}
        <p className="text-base">{props.task}</p>
      </div>
      <span className="text-sm font-semibold">
        {clampedProgress}/{props.requiredAmount}
      </span>
    </div>
  );
};
