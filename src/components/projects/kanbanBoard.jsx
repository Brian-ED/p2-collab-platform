"use client";

import { useState } from "react";
import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const entries = [
  {
    name: "backlog test 1",
    section: "backlog",
    users: [],
  },
  {
    name: "backlog test 2",
    section: "backlog",
    users: [],
  },
  {
    name: "progress test 1",
    section: "progress",
    users: [],
  },
  {
    name: "progress test 2",
    section: "progress",
    users: [],
  },
  {
    name: "progress test 3",
    section: "progress",
    users: [],
  },
  {
    name: "review test 1",
    section: "review",
    users: [],
  },
  {
    name: "review test 2",
    section: "review",
    users: [],
  },
  {
    name: "done test 1",
    section: "done",
    users: [],
  },
  {
    name: "done test 2",
    section: "done",
    users: [],
  },
  {
    name: "done test 3",
    section: "done",
    users: [],
  },
];

const KanbanEntry = ({ name, section, users }) => {
  return (
    <div className="h-fit w-full p-2">
      <h3 className="text-lg">{name}</h3>
    </div>
  );
};

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}

export const KanbanBoard = () => {
  const [parent, setParent] = useState(null);
  const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable id="droppable">
        {parent === "droppable" ? draggable : "Drop here"}
      </Droppable>
    </DndContext>
  );

  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);
  }

  return (
    <div className="flex flex-row">
      <section className="m-2 w-full h-fit border-3 rounded-3xl">
        <h1 className="text-xl text-center my-2">Backlog</h1>
        <div>
          {entries.map(
            (entry) =>
              entry.section === "backlog" && (
                <KanbanEntry key={entry.name} {...entry} />
              )
          )}
        </div>
      </section>
      <section className="m-2 w-full border-3 rounded-3xl">
        <h1 className="text-xl text-center my-2">In progress</h1>
        <div>
          {entries.map(
            (entry) =>
              entry.section === "progress" && (
                <KanbanEntry key={entry.name} {...entry} />
              )
          )}
        </div>
      </section>
      <section className="m-2 w-full border-3 rounded-3xl">
        <h1 className="text-xl text-center my-2">In review</h1>
        <div>
          {entries.map(
            (entry) =>
              entry.section === "review" && (
                <KanbanEntry key={entry.name} {...entry} />
              )
          )}
        </div>
      </section>
      <section className="m-2 w-full border-3 rounded-3xl">
        <h1 className="text-xl text-center my-2">Done</h1>
        <div>
          {entries.map(
            (entry) =>
              entry.section === "done" && (
                <KanbanEntry key={entry.name} {...entry} />
              )
          )}
        </div>
      </section>
    </div>
  );
};
