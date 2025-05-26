export const BoxedProject = ({
  title = "MISSING",
  memberNames,
  onClick,
}) => {
  const visibleMembers = memberNames.slice(0, 6);
  const extraCount = memberNames.length - visibleMembers.length;

  return (
    <button
      onClick={onClick}
      className="w-84 h-52 bg-[#1f2937] border border-[#2e2e2e] hover:border-blue-500 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 px-6 py-6 text-left flex flex-col justify-between cursor-pointer group"
    >
      {/* Top part - title + members */}
      <div>
        <h3 className="text-white font-semibold text-xl leading-snug mb-3 truncate">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-2">Team Members</p>

        {/* Member name tags - truncated if necessary */}
        <div className="flex flex-wrap gap-1.5">
          {visibleMembers.map(({ id, name }) => (
            <span
              key={id}
              className="bg-[#2f3a4b] text-white text-xs px-2 py-0.5 rounded-md max-w-[7rem] truncate"
            >
              {name === "" ? "Unnamed" : name}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="bg-gray-600 text-white text-xs px-2 py-0.5 rounded-md">
              +{extraCount}
            </span>
          )}
        </div>
      </div>

      {/* Pushed to the bottom of the container due to the justify-between property on the bottom element */}
      <div className="flex justify-end pt-2">
        <span className="text-blue-400 text-sm group-hover:text-white transition">
          Open Project →
        </span>
      </div>
    </button>
  );
};
