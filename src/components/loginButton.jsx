"use client";

import { useEffect, useState } from "react";
import {
  getSessionAndUpdateUser,
  handleSignIn,
  handleSignOut,
} from "@/lib/authActions";

import { FaGithub } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";

export const LoginButton = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSessionAndUpdateUser();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  return session?.user ? (
    <form
      action={async () => {
        await handleSignOut();
        setSession(null);
      }}
    >
      <button
        type="submit"
        className="flex flex-row w-33 rounded-xl bg-button items-center justify-center p-1 hover:bg-button-hover hover:cursor-pointer text-xl"
      >
        <RiLogoutBoxRLine className="size-8 mr-2" />
        Logout
      </button>
    </form>
  ) : (
    <form
      action={async () => {
        await handleSignIn();
        const newSession = await getSessionAndUpdateUser(); // Fetch session after login
        setSession(newSession);
      }}
    >
      <button
        type="submit"
        className="flex flex-row w-33 rounded-xl bg-button items-center justify-center p-1 hover:bg-button-hover hover:cursor-pointer text-xl"
      >
        <FaGithub className="size-8 mr-2" />
        Login
      </button>
    </form>
  );
};
