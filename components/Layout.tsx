import Link from "next/link";
import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [knackAppId, setKnackAppId] = useState("");

  const start = (
    <Link href="/">
      <h1>KnackLens</h1>
    </Link>
  );
  const end = (
    <>
      <InputText
        placeholder="Enter a Knack App ID"
        type="text"
        className="w-15rem"
        value={knackAppId}
        onChange={(e) => setKnackAppId(e.target.value)}
      />
      <Link href={`/${knackAppId}`}>
        <Button label="Go" onClick={() => setKnackAppId("")} />
      </Link>
    </>
  );

  return (
    <>
      <Menubar start={start} end={end} />
      {children}
      <footer>
        <div id="footer-inner">
          <p>&copy; {new Date().getFullYear()} - Brady Vossler 🤠</p>
        </div>
      </footer>
    </>
  );
}
