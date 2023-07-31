import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useContext, useState } from "react";
import { AppIdContext, KnackIDContext } from "./Store";

const AppSearch = () => {
  const { knackAppId, setKnackAppId } = useContext(AppIdContext) as KnackIDContext;

  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
      <InputText
        placeholder="Enter a Knack App ID"
        type="text"
        className="w-15rem"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Link href={`/${inputValue}`}>
        <Button label="Go" onClick={() => setKnackAppId(inputValue)} />
      </Link>
    </>
  );
};

export default AppSearch;
