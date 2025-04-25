"use client";

import { useState, useEffect } from "react";
import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { mockData } from "./kanbanMockData";
import { useParams } from "next/navigation";

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
  const { pid } = useParams();
  const [entries, setEntries] = useState(mockData);
  const [changeEntry, setChangeEntry] = useState(false);

  function handleDragEnd({ active, over }) {
    if (!over) return;
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id.toString() === active.id
          ? { ...entry, status: over.id }
          : entry
      )
    );
  }

  useEffect(() => {
    fetch(`/api/db/getKanban?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setEntries(data.data);
        //setIsLoading(false);
      });
  }, [changeEntry]);

  // dnd-kit requires the draggable ids to be strings x.x
  return (
    <div className="flex flex-row">
      <DndContext onDragEnd={handleDragEnd}>
        <section className="m-2 w-full border-3 rounded-3xl h-fit">
          <h1 className="text-xl text-center my-2">Backlog</h1>
          <div className="flex flex-col p-2">
            <Droppable id="backlog">
              {entries.map(
                (entry) =>
                  entry.status === "backlog" && (
                    <Draggable key={entry.id} id={entry.id.toString()}>
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
                  entry.status === "progress" && (
                    <Draggable key={entry.id} id={entry.id.toString()}>
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
                  entry.status === "review" && (
                    <Draggable key={entry.id} id={entry.id.toString()}>
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
                  entry.status === "done" && (
                    <Draggable key={entry.id} id={entry.id.toString()}>
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
