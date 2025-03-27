import { signIn, signOut, auth } from "@/auth/authSetup";
import { addUser } from "@/app/lib/queries.js";

export const LoginButton = async () => {
  const session = await auth();

  if (!!session) {
    ("use server");
    // Exports userId from github profile image.
    const userId = session.user.image.split("/")[4].split("?")[0];
    const userName = session.user.name;
    await addUser(userName, userId);
  }

  let signInOrOutButton;

  // Select page depending on if user is logged in
  if (session?.user) {
    // Logged in
    signInOrOutButton = (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Logout</button>
      </form>
    );
  } else {
    // Logged Out
    signInOrOutButton = (
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button type="submit">Login with GitHub</button>
      </form>
    );
  }

  return signInOrOutButton;
};
