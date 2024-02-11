import Store from "@/components/Store";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KnackLens | Home",
  description: "Easily view Knack application metadata",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Store>
          <main className="flex min-h-screen flex-col md:px-8 px-4 max-w-screen-2xl m-auto">{children}</main>
        </Store>
      </body>
    </html>
  );
}
