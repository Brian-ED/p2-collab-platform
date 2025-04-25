import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="m-2">
        <Link href={{ pathname: "/projects" }}>
          <button className="text-2xl border-3 p-1 rounded-2xl">
            projects
          </button>
        </Link>
      </div>
    </main>
  );
}
