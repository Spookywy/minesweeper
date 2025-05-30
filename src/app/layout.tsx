import Footer from "@/components/footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import { Analytics } from '@vercel/analytics/next';
config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="flex flex-col bg-neutral-900 h-full text-neutral-100">
        <div className="flex-grow">{children}</div>
        <Analytics />
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
