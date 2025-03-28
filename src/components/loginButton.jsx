"use client";

import { useEffect, useState } from "react";
import {
  getSessionAndUpdateUser,
  handleSignIn,
  handleSignOut,
} from "@/lib/authActions";

export const LoginButton = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSessionAndUpdateUser();
      setSession(sessionData);
    };

    console.log("test");

    fetchSession();
  }, []);

  return session?.user ? (
    <form
      action={async () => {
        await handleSignOut();
        setSession(null);
      }}
    >
      <button type="submit">Logout</button>
    </form>
  ) : (
    <form
      action={async () => {
        await handleSignIn();
        const newSession = await getSessionAndUpdateUser(); // Fetch session after login
        setSession(newSession);
      }}
    >
      <button type="submit">Login with GitHub</button>
    </form>
  );
};
