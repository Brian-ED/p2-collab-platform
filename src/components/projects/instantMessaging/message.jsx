export const Message = ({ message, sender, time }) => {
  return (
    <div className="flex flex-row gap-4 p-4 max-w-md bg-white shadow-md rounded-2xl border border-gray-200 text-black mb-3">
      <p>{sender}</p>
      <h1>{message}</h1>
      <p>{time}</p>
    </div>
  );
};
