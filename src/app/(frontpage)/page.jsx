import { LoginButton } from "@/components/loginButton";

export default function Home() {
  return (
    <main>
      <div className="w-full h-[calc(100vh-40*var(--spacing))] flex">
        <div className="m-auto scale-200">
          <LoginButton />
        </div>
      </div>
    </main>
  );
}
