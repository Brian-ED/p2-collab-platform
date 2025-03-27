import pg from "pg";
import { promises as fs } from "fs";

const { Pool } = pg;

const pool = new Pool({
  connectionTimeoutMillis: 10000,
  connectionString: process.env.DATABASE_URL,
  allowExitOnIdle: false,
});

export default async function checkIfTablesExist() {
  const file = (await fs.readFile("./src/app/lib/checktables.sql")).toString();
  await pool.query(file);
}

export async function addUser(name, userId) {
  await client.query(
    `INSERT INTO users (name, userId) VALUES (${name}, ${userId})`
  );
}
