import pkg from "./app/lib/queries.mjs";
const checkIfTablesExist = pkg;

await checkIfTablesExist();

console.log("postbuild finished...");
