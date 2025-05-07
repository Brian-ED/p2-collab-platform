import { mockDeep, mockReset } from "jest-mock-extended";

import prisma from "./lib/prisma";

jest.mock("./lib/prisma", () => ({
  __esModule: true,
  default: mockDeep(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma;
