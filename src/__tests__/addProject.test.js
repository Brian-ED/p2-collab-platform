import { POST } from "@/app/api/db/addProject/route";
import { auth } from "@/auth/authSetup";
import { addProject } from "@/lib/queries";

global.Response = {
  json: (data) => ({
    status: 200,
    json: async () => data,
  }),
  redirect: (url) => {
    return {
      status: 307,
      headers: {
        get: (key) => {
          if (key === "Location") {
            return url.toString();
          }
          return null;
        },
      },
    };
  },
};

jest.mock("@/auth/authSetup", () => ({
  auth: jest.fn(),
}));

jest.mock("@/lib/queries", () => ({
  addProject: jest.fn(),
}));

describe("POST /api/db/addProject", () => {
  const buildRequest = (projectName) => {
    return {
      url: "https://localhost:3000/api/db/addProject",
      formData: async () => ({
        get: (key) => {
          if (key === "project-name") {
            return projectName;
          }
          return null;
        },
      }),
    };
  };

  test("returns error if project name is too long", async () => {
    const req = buildRequest("x".repeat(51));
    const res = await POST(req);
    const json = await res.json();
    expect(json.error).toBe("Project name too long!");
  });

  test("returns error if project name is too short", async () => {
    const req = buildRequest("");
    const res = await POST(req);
    const json = await res.json();
    expect(json.error).toBe("Project name too short!");
  });

  test("returns error if not authorized", async () => {
    auth.mockResolvedValue(null);
    const req = buildRequest("Test Project");
    const res = await POST(req);
    const json = await res.json();
    expect(json.error).toBe("Not authorized");
  });

  test("redirects to new project if authorized", async () => {
    auth.mockResolvedValue({ user: { id: "user123" } });
    addProject.mockResolvedValue("1");

    const req = buildRequest("Valid Project");
    const res = await POST(req);

    expect(res.status).toBe(307); // Temporary Redirect
    expect(res.headers.get("Location")).toBe(
      "https://localhost:3000/projects/1"
    );
  });
});
