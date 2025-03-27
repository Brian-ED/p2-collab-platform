import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL);

export async function checkIfTablesExist() {
  await sql.file("./src/app/lib/checktables.sql");
}

export async function addUser(name, userId) {
  await sql`INSERT INTO users (name, userId) VALUES (${name}, ${userId})`;
}
