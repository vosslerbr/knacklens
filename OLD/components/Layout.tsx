import Link from "next/link";
import React, { useContext, useState } from "react";
import { Menubar } from "primereact/menubar";
import AppSearch from "./AppSearch";
import { AppContext } from "./Store";
import { AppDataContext } from "@/types";
import { Button } from "primereact/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { appData } = useContext(AppContext) as AppDataContext;

  const logoHomeLink = (
    <Link href={`/${appData?.id || ""}`}>
      <h1>KnackLens</h1>
    </Link>
  );

  return (
    <>
      <Menubar
        start={logoHomeLink}
        end={AppSearch}
        style={{
          paddingLeft: "2rem",
          paddingRight: "2rem",
          marginBottom: "2rem",
        }}
      />
      {appData?.id && (
        <div className="card">
          <h2 id="app-name">{appData?.appName}</h2>
          <p id="app-desc">{appData?.appDescription}</p>

          <div id="app-links">
            <Link href={`/${appData?.id}/`}>
              <Button label="Metadata" />
            </Link>
            <Link href={`/${appData?.id}/objects`}>
              <Button label="Objects" />
            </Link>
            <Link href={`/${appData?.id}/fields`}>
              <Button label="Fields" />
            </Link>
            <Link href={`/${appData?.id}/scenes`}>
              <Button label="Scenes" />
            </Link>
            <Link href={`/${appData?.id}/views`}>
              <Button label="Views" />
            </Link>
            <Link href={`/${appData?.id}/tasks`}>
              <Button label="Tasks" />
            </Link>
            {/* //TODO */}
            {/* <Link href={`/${appData.id}/field-rules`}>
                <Button label="Field Rules" />
              </Link> */}
          </div>
        </div>
      )}

      {children}
      <footer>
        <div id="footer-inner">
          <p>&copy; {new Date().getFullYear()} - Brady Vossler 🤠</p>
        </div>
      </footer>
    </>
  );
}
