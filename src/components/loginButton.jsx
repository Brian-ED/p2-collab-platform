import { signIn, signOut, auth } from "@/auth/authSetup";

export const LoginButton = async () => {
  let session = await auth();

  return (
    <div>
      {session?.user ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Logout</button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <button type="submit">Login with GitHub</button>
        </form>
      )}
    </div>
  );
};
