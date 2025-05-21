import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>P2 Collab Platform</title>
        <meta name="description" content="Collaborative project platform" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
