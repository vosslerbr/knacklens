import Link from "next/link";
import React from "react";
import { Menubar } from "primereact/menubar";
import AppSearch from "./AppSearch";

export default function Layout({ children }: { children: React.ReactNode }) {
  const start = (
    <Link href="/">
      <h1>KnackLens</h1>
    </Link>
  );

  return (
    <>
      <Menubar start={start} end={AppSearch} />
      {children}
      <footer>
        <div id="footer-inner">
          <p>&copy; {new Date().getFullYear()} - Brady Vossler 🤠</p>
        </div>
      </footer>
    </>
  );
}
