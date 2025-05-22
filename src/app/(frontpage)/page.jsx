"use client";

import { Loading } from "@/components/loading";
import { LoginButton } from "@/components/loginButton";
import { useState, useEffect } from "react";
import { getSessionAndUpdateUser } from "@/lib/authActions";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSessionAndUpdateUser();
      setSession(!!sessionData);
      setLoading(false);
    };

    fetchSession();
  }, []);

  if (loading) return <Loading />;

  if (session) {
    window.location.href = "/projects";
  } else {
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
}
