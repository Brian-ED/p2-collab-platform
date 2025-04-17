import dayjs from "dayjs";

export const Message = ({ message, sender, time }) => {
  const currentDate = dayjs(time);
  const formattedDate = currentDate.format('YYYY-MM-DD kl. HH:mm');
  
  return (
    <div className="flex flex-row gap-4 p-4 max-w-2xl bg-white shadow-md rounded-2xl border border-gray-200 mb-3 w-fit">
      <div className="flex flex-col w-full break-words">
        <p className="font-semibold text-black">{sender}</p>
        <p className="text-base text-black whitespace-pre-wrap">{message}</p>
        <p className="text-xs text-gray-400 mt-2">{formattedDate}</p>
      </div>
    </div>
  );
};