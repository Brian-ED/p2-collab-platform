import pkg from "./app/lib/queries.mjs";
const { checkIfTablesExist } = pkg;

export default async function startup() {
  await checkIfTablesExist();
}
