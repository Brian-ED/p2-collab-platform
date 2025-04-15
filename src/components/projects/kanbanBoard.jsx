export const KanbanBoard = () => {
  return (
    <div className="flex flex-row">
      <section className="m-2 w-full h-fit border-3 rounded-3xl">
        <h1 className="text-xl text-center my-2">Backlog</h1>
        <div></div>
      </section>
      <section className="m-2 w-full border-3 rounded-3xl">
        <h1 className="text-xl text-center my-2">In progress</h1>
        <div></div>
      </section>
      <section className="m-2 w-full border-3 rounded-3xl">
        <h1 className="text-xl text-center my-2">In review</h1>
        <div></div>
      </section>
      <section className="m-2 w-full border-3 rounded-3xl">
        <h1 className="text-xl text-center my-2">Done</h1>
        <div></div>
      </section>
    </div>
  );
};
