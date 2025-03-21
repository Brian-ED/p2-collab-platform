import { GanttChart } from "@/components/ganttChart";

export default function Projects() {
  return (
    <>
      <GanttChart
        tasks={[
          {
            id: 1,
            title: "Test1",
            description: "This is test1",
            startDate: new Date("2025-03-10"),
            endDate: new Date("2025-03-18"),
            percentComplete: 50,
          },
          {
            id: 2,
            title: "Test2",
            description: "This is test2",
            startDate: new Date("2025-03-19"),
            endDate: new Date("2025-03-25"),
            percentComplete: 25,
          },
          {
            id: 3,
            title: "Test3 yabba dabba doo shit on my shoe",
            description: "This is test3",
            startDate: new Date("2025-03-10"),
            endDate: new Date("2025-03-15"),
            percentComplete: 0,
          },
          {
            id: 4,
            title: "Test4",
            description: "This is test4",
            startDate: new Date("2025-03-22"),
            endDate: new Date("2025-03-30"),
            percentComplete: 0,
          },
          {
            id: 5,
            title: "Test5",
            description:
              "Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor Lorem ipsum din mor",
            startDate: new Date("2025-03-10"),
            endDate: new Date("2025-03-30"),
            percentComplete: 0,
          },
        ]}
      />
    </>
  );
}
