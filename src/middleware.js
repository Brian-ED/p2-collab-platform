export { auth as middleware } from "@/auth/authSetup";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
