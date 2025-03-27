import { checkIfTablesExist } from "@/app/lib/queries";

export async function register() {
  await checkIfTablesExist();
}
