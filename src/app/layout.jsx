import "./globals.css";

export const metadata = {
    title: "P2 Collab Platform",
    description: "",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
