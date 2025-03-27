import { LoginButton } from "@/components/loginButton";

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="m-2">
        <Link href={{ pathname: "/projects/test", query: { melih: "gay" } }}>
          <button className="text-2xl border-3 p-1 rounded-2xl">
            projects
          </button>
        </Link>
      </div>
      <LoginButton />
    </main>
  );
}
