import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useContext } from "react";
import { AppIdContext } from "./Store";

const AppSearch = () => {
  const knackAppId = useContext(AppIdContext);
  const setKnackAppId = useContext(AppIdContext);

  return (
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
};
