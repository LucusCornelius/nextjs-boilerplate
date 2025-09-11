import "@styles/globals.css";
import Navbar from "@components/Navbar";

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
      <body className="bg-white/70">
        <main className="pt-[9vh]">
            <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
