import { LoginButton } from "@/components/loginButton";

export default function FrontpageLayout({ children }) {
  return (
    <div className="min-h-screen bg-backdrop">
      <header className="bg-navbar fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center">
            <h1 className="ml-4 text-xl font-semibold text-white">
              P2 Collab Platform
            </h1>
          </div>
          <nav>
            <LoginButton />
          </nav>
        </div>
      </header>
      <main className="pt-16 ml-0">
        <div className="p-2">{children}</div>
      </main>
    </div>
  );
}
