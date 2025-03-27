import pg from "pg";
import { promises as fs } from "fs";

const { Pool } = pg;

const pool = new Pool({
  connectionTimeoutMillis: 10000,
  connectionString: process.env.DATABASE_URL,
  allowExitOnIdle: false,
});

const file = (await fs.readFile("./src/app/lib/checktables.sql")).toString();
await pool.query(file);
await pool.end();

console.log("postbuild finished...");
