import Link from "next/link";
import React, { useContext } from "react";
import { Menubar } from "primereact/menubar";
import AppSearch from "./AppSearch";
import { AppContext, AppDataContext } from "./Store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { appData } = useContext(AppContext) as AppDataContext;

  const logoHomeLink = (
    <Link href={`/${appData?.id || ""}`}>
      <h1>KnackLens</h1>
    </Link>
  );

  return (
    <>
      <Menubar start={logoHomeLink} end={AppSearch} />
      {children}
      <footer>
        <div id="footer-inner">
          <p>&copy; {new Date().getFullYear()} - Brady Vossler 🤠</p>
        </div>
      </footer>
    </>
  );
}
