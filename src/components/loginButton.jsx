import { signIn, signOut, auth } from "@/auth/authSetup";

export const LoginButton = async () => {
  const session = await auth();
  let signInOrOutButton;

  // Select page depending on if user is logged in
  if (session?.user) { // Logged in
    signInOrOutButton = (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Logout</button>
      </form>
    )
  } else { // Logged Out
    signInOrOutButton = (
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button type="submit">Login with GitHub</button>
      </form>
    )
  }

  return signInOrOutButton
};
