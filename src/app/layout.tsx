import "@styles/globals.css";
import Nav from "@components/Nav";

export const metadata = {
  title: "NextJS boilerplate",
  description: "A NextJS boilerplate with TailwindCSS and TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
