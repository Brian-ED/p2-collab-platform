export const BoxedProject = ({
  title = "MISSING",
  memberNames,
  onClick,
}) => {
  const visibleMembers = memberNames.slice(0, 3);
  const extraCount = memberNames.length - visibleMembers.length;

  return (
    <button
      onClick={onClick}
      className="w-52 h-48 bg-[#1f2937] border border-[#374151] hover:border-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col justify-between text-left cursor-pointer group"
    >
      {/* Project title */}
      <div>
        <h3 className="text-white font-semibold text-lg leading-tight mb-2 truncate">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-1">Team Members</p>

        <div className="space-y-0.5">
          {visibleMembers.map(({ id, name }) => (
            <p
              key={id}
              className="text-white text-sm truncate"
            >
              {name === "" ? "Non-named User" : name}
            </p>
          ))}

          {extraCount > 0 && (
            <p className="text-gray-400 text-sm">+{extraCount} more</p>
          )}
        </div>
      </div>

      {/* Footer action / icon area */}
      <div className="flex justify-end">
        <span className="text-sm text-blue-400 group-hover:text-white transition">
           View →
        </span>
      </div>
    </button>
  );
};
