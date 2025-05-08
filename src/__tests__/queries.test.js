import { prismaMock } from "../singleton";
import { addUser, getGanttTasks } from "@/lib/queries";

describe("Prisma query tests", () => {
  test("should create a new user", async () => {
    const user = {
      id: 1,
      name: "Testuser",
      user_id: "12345678",
      joined_at: "2025-05-06T09:40:31.811Z",
      email: "test@user.com",
    };

    prismaMock.users.count.mockResolvedValue(0);
    prismaMock.users.create.mockResolvedValue(user);

    await expect(addUser(user.name, user.user_id, user.email)).resolves.toEqual(
      {
        id: 1,
        name: "Testuser",
        user_id: "12345678",
        joined_at: "2025-05-06T09:40:31.811Z",
        email: "test@user.com",
      }
    );
  });

  test("should get all gantt tasks for a project", async () => {
    const gantt_tasks = [
      {
        id: 1,
        project_id: 2,
        start_date: "08-05-2025",
        end_date: "09-05-2025",
        title: "Test1",
        description: "Test2",
        completed: false,
      },
      {
        id: 2,
        project_id: 2,
        start_date: "10-05-2025",
        end_date: "20-05-2025",
        title: "Test3",
        description: "Test4",
        completed: true,
      },
    ];

    prismaMock.gantt_charts.findMany.mockResolvedValue(gantt_tasks);

    await expect(getGanttTasks(2)).resolves.toEqual([
      {
        id: 1,
        project_id: 2,
        start_date: "08-05-2025",
        end_date: "09-05-2025",
        title: "Test1",
        description: "Test2",
        completed: false,
      },
      {
        id: 2,
        project_id: 2,
        start_date: "10-05-2025",
        end_date: "20-05-2025",
        title: "Test3",
        description: "Test4",
        completed: true,
      },
    ]);
  });
});
