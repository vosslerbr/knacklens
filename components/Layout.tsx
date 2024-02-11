import { AppDataContext } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import React, { useContext } from "react";
import AppSearch from "./AppSearch";
import { AppContext } from "./Store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { appData } = useContext(AppContext) as AppDataContext;

  const logoHomeLink = (
    <Link href={`/${appData?.id || ""}`}>
      <h1>KnackLens</h1>
    </Link>
  );

  const router = useRouter();

  const isActivePath = (path: string, matchExact = false) => {
    if (matchExact) {
      return router.pathname === path;
    } else {
      return router.pathname.includes(path);
    }
  };

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
              <Button label="Metadata" text={!isActivePath("/[id]", true)} />
            </Link>
            <Link href={`/${appData?.id}/objects`}>
              <Button label="Objects" text={!isActivePath("/objects")} />
            </Link>
            <Link href={`/${appData?.id}/fields`}>
              <Button label="Fields" text={!isActivePath("/fields")} />
            </Link>
            <Link href={`/${appData?.id}/scenes`}>
              <Button label="Scenes" text={!isActivePath("/scenes")} />
            </Link>
            <Link href={`/${appData?.id}/views`}>
              <Button label="Views" text={!isActivePath("/views")} />
            </Link>
            <Link href={`/${appData?.id}/tasks`}>
              <Button label="Tasks" text={!isActivePath("/tasks")} />
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
