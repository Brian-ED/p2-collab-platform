"use server";

import { auth, signIn, signOut } from "@/auth/authSetup";
import { addUser } from "@/lib/queries.js";

export const getSessionAndUpdateUser = async () => {
  const session = await auth();

  if (!!session) {
    const userId = session.user.image.split("/")[4].split("?")[0];
    const userName = session.user.name;
    await addUser(userName, userId);
  }

  return session;
};

export const handleSignIn = async () => {
  await signIn("github");
};

export const handleSignOut = async () => {
  await signOut();
};
