import { prismaMock } from "../singleton";

test("should create a new user", async () => {
  const user = {
    id: 1,
    name: "Oliver",
    user_id: "12345678",
  };

  prismaMock.user.create.mockResolvedValue(user);
});
