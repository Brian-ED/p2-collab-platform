import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "P2 Collab Platform",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
