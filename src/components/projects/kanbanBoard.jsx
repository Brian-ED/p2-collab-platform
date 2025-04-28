"use client";

import { useState, useEffect } from "react";
import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useParams } from "next/navigation";
import { Loading } from "@/components/loading";

import { FaPlus, FaX } from "react-icons/fa6";

const KanbanEntry = ({ name }) => {
  const [entryHover, setEntryHover] = useState(false);
  return (
    <>
      <div
        className="h-fit w-full p-2 cursor-grab hover:bg-white/20 flex flex-row justify-between"
        onMouseEnter={() => setEntryHover(true)}
        onMouseLeave={() => setEntryHover(false)}
      >
        <h3 className="text-lg">{name}</h3>
        {entryHover && (
          <div className="flex">
            <FaX size={20} className="m-auto text-red-600" />
          </div>
        )}
      </div>
    </>
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

const AddKanbanEntry = ({ submitFunction }) => {
  return (
    <div
      className={
        "absolute w-fit h-fit bg-white top-2 left-12 border-2 border-black text-black flex flex-col text-center p-2 transition-all duration-150"
      }
    >
      <form action={() => submitFunction()} id="addEntry">
        <h3 className="text-center font-bold text-lg mb-2 text-nowrap">
          Add new Kanban entry
        </h3>
        <label className="font-semibold" htmlFor="title">
          Name:
        </label>
        <br />
        <input className="border-1 mb-2 " type="text" name="kanban-name" />
        <br />
        <label className="font-semibold" htmlFor="description">
          Description:
        </label>
        <br />
        <textarea
          className="border-1 mb-2 text-sm resize-none"
          rows="3"
          cols="21"
          name="kanban-description"
        />
        <br />
        <label className="font-semibold" htmlFor="status">
          Status:
        </label>
        <br />
        <label htmlFor="backlog">Backlog </label>
        <input
          type="radio"
          id="backlog"
          name="kanban-status"
          value="backlog"
          defaultChecked
        />
        <br />
        <label htmlFor="progress">In progress </label>
        <input
          type="radio"
          id="progress"
          name="kanban-status"
          value="progress"
        />
        <br />
        <label htmlFor="review">In review </label>
        <input type="radio" id="review" name="kanban-status" value="review" />
        <br />
        <label htmlFor="done">Done </label>
        <input type="radio" id="done" name="kanban-status" value="done" />
        <br />
        <input
          className="border-2 px-2 rounded-full mt-2 hover:bg-gray-500/30"
          type="submit"
          value="Add entry"
        />
      </form>
    </div>
  );
};

export const KanbanBoard = () => {
  const { pid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState();
  const [changeEntry, setChangeEntry] = useState(false);
  const [addEntryHover, setAddEntryHover] = useState(false);
  const [addEntryClicked, setAddEntryClicked] = useState(false);

  function handleDragEnd({ active, over }) {
    if (!over) return;
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id.toString() === active.id) {
          changeKanbanStatus(entry.id, over.id);
          return { ...entry, status: over.id };
        } else return entry;
      })
    );
  }

  function changeKanbanStatus(id, status) {
    fetch(`/api/db/handleKanban?projectId=${pid}`, {
      method: "PATCH",
      body: JSON.stringify({ entryId: id, entryStatus: status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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

  const addNewKanbanEntry = () => {
    setIsLoading(true);
    const data = new URLSearchParams(
      new FormData(document.querySelector("#addEntry"))
    );
    fetch(`/api/db/handleKanban?projectId=${pid}`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(() => {
      setChangeEntry(!changeEntry);
      setAddEntryClicked(false);
    });
  };

  if (isLoading) return <Loading />;

  // dnd-kit requires the draggable ids to be strings x.x
  return (
    <>
      <div className="relative flex flex-row w-fit m-2">
        <h2 className="text-lg m-auto">Add a new Kanban entry:</h2>
        <div
          className="h-12 w-12 flex"
          onMouseEnter={() => setAddEntryHover(true)}
          onMouseLeave={() => setAddEntryHover(false)}
          onClick={() => setAddEntryClicked(!addEntryClicked)}
        >
          <FaPlus className="text-green-500 m-auto z-20" size={30} />

          <div
            className={`absolute bg-white mt-7 ml-9 z-80 text-black text-sm whitespace-nowrap transition-all duration-150 border-1 px-1 ${
              addEntryHover ? "scale-100" : "scale-0"
            }`}
          >
            <span>Add entry...</span>
          </div>
        </div>
        <div
          className={`relative z-100 transition-all duration-150 w-fit h-fit ${
            addEntryClicked ? "scale-100" : "scale-0"
          }`}
        >
          <AddKanbanEntry submitFunction={addNewKanbanEntry} />
        </div>
      </div>

      <div className="flex flex-row">
        <DndContext onDragEnd={handleDragEnd}>
          {kanbanSections.map((section) => (
            <section
              key={section}
              className="m-2 w-full border-3 rounded-3xl h-fit"
            >
              <Droppable id={section}>
                <h1 className="text-2xl text-center my-2">
                  {section === "backlog"
                    ? "Backlog"
                    : section === "progress"
                    ? "In progress"
                    : section === "review"
                    ? "In review"
                    : section === "done"
                    ? "Done"
                    : null}
                </h1>
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
    </>
  );
};
