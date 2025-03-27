import pg from "pg";
import { promises as fs } from "fs";

const connectionString = process.env.DATABASE_URL;

const { Client } = pg;
const client = new Client({ connectionString });
await client.connect();

export default async function checkIfTablesExist() {
  const file = (await fs.readFile("./app/lib/checktables.sql")).toString();
  await client.query(file);
}

export async function addUser(name, userId) {
  await client.query(
    `INSERT INTO users (name, userId) VALUES (${name}, ${userId})`
  );
}
