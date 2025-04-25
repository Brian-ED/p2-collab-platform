"use client";

import { useState, useEffect } from "react";
import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { mockData } from "./kanbanMockData";
import { useParams } from "next/navigation";
import { Loading } from "@/components/loading";

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
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      });
  }, [changeEntry]);

  const kanbanSections = ["backlog", "progress", "review", "done"];

  if (isLoading) return <Loading />;

  // dnd-kit requires the draggable ids to be strings x.x
  return (
    <div className="flex flex-row">
      <DndContext onDragEnd={handleDragEnd}>
        {kanbanSections.map((section) => (
          <section
            key={section}
            className="m-2 w-full border-3 rounded-3xl h-fit"
          >
            <Droppable id={section}>
              <h1 className="text-xl text-center my-2">Backlog</h1>
              <div className="flex flex-col p-2">
                {entries.map(
                  (entry) =>
                    entry.status === section && (
                      <Draggable key={entry.id} id={entry.id.toString()}>
                        <KanbanEntry {...entry} />
                      </Draggable>
                    )
                )}
              </div>
            </Droppable>
          </section>
        ))}
      </DndContext>
    </div>
  );
};
