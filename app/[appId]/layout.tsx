import { Sidebar } from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KnackLens | Home",
  description: "Easily view Knack application metadata",
};

export default function AppContextLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO figure out better CSS for the sidebar and content widths
  return (
    <div className="flex flex-row gap-8">
      <Sidebar className="w-1/5" />
      <div className="w-4/5 mt-6">{children}</div>
    </div>
  );
}
