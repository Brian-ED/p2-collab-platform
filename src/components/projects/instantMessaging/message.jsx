export const Message = ({ message, sender, time }) => {
  return (
    <div className="flex gap-5">
      <p>{sender}</p>
      <h1>{message}</h1>
      <p>{time}</p>
    </div>
  );
};
