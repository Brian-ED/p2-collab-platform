"use client";

import { useState } from "react";
import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { mockData } from "./kanbanMockData";

const KanbanEntry = ({ name }) => {
  return (
    <div className="h-fit w-full p-2 cursor-grab hover:bg-white/20">
      <h3 className="text-lg">{name}</h3>
    </div>
  );
};

function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {};

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

export const KanbanBoard = () => {
  const [entries, setEntries] = useState(mockData);

  function handleDragEnd({ active, over }) {
    if (!over) return;
    setEntries((prev) =>
      prev.map((entry) =>
        entry.name === active.id ? { ...entry, section: over.id } : entry
      )
    );
  }

  return (
    <div className="flex flex-row">
      <DndContext onDragEnd={handleDragEnd}>
        <section className="m-2 w-full border-3 rounded-3xl h-fit">
          <h1 className="text-xl text-center my-2">Backlog</h1>
          <div className="flex flex-col p-2">
            <Droppable id="backlog">
              {entries.map(
                (entry) =>
                  entry.section === "backlog" && (
                    <Draggable key={entry.name} id={entry.name}>
                      <KanbanEntry {...entry} />
                    </Draggable>
                  )
              )}
            </Droppable>
          </div>
        </section>
        <section className="m-2 w-full border-3 rounded-3xl h-fit">
          <h1 className="text-xl text-center my-2">In progress</h1>
          <div className="flex flex-col p-2">
            <Droppable id="progress">
              {entries.map(
                (entry) =>
                  entry.section === "progress" && (
                    <Draggable key={entry.name} id={entry.name}>
                      <KanbanEntry {...entry} />
                    </Draggable>
                  )
              )}
            </Droppable>
          </div>
        </section>
        <section className="m-2 w-full border-3 rounded-3xl h-fit">
          <h1 className="text-xl text-center my-2">In review</h1>
          <div className="flex flex-col p-2">
            <Droppable id="review">
              {entries.map(
                (entry) =>
                  entry.section === "review" && (
                    <Draggable key={entry.name} id={entry.name}>
                      <KanbanEntry {...entry} />
                    </Draggable>
                  )
              )}
            </Droppable>
          </div>
        </section>
        <section className="m-2 w-full border-3 rounded-3xl h-fit">
          <h1 className="text-xl text-center my-2">Done</h1>
          <div className="flex flex-col p-2">
            <Droppable id="done">
              {entries.map(
                (entry) =>
                  entry.section === "done" && (
                    <Draggable key={entry.name} id={entry.name}>
                      <KanbanEntry {...entry} />
                    </Draggable>
                  )
              )}
            </Droppable>
          </div>
        </section>
      </DndContext>
    </div>
  );
};
