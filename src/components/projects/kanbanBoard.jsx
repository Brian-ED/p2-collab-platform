const entries = [
  {
    name: "test 1",
    section: "backlog",
    users: [],
  },
  {
    name: "test 2",
    section: "backlog",
    users: [],
  },
  {
    name: "test 3",
    section: "progress",
    users: [],
  },
  {
    name: "test 4",
    section: "review",
    users: [],
  },
  {
    name: "test 5",
    section: "review",
    users: [],
  },
  {
    name: "test 6",
    section: "done",
    users: [],
  },
];

const KanbanEntry = ({ name, section, users }) => {
  return (
    <div className="h-fit w-full">
      <h3 className="text-lg">{name}</h3>
    </div>
  );
};

export const KanbanBoard = () => {
  return (
    <div className="flex flex-row">
      <section className="m-2 w-full h-fit border-3 rounded-3xl">
        <h1 className="text-xl text-center my-2">Backlog</h1>
        <div>
          {entries.map((entry) => (
            <KanbanEntry key={entry.name} {...entry} />
          ))}
        </div>
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
