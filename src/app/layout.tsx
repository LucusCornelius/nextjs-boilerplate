import "@styles/globals.css";

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
          {children}
        </main>
      </body>
    </html>
  );
}
