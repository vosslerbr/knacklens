"use client";

import { KnackIDContext } from "@/types";
import Link from "next/link";
import { useContext, useState } from "react";
import { AppIdContext } from "./Store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const AppSearch = () => {
  const { setKnackAppId } = useContext(AppIdContext) as KnackIDContext;

  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div className="flex w-1/4 m-auto">
      <Input
        placeholder="Enter a Knack App ID"
        type="text"
        className="w-15rem"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <Button onClick={() => setKnackAppId(inputValue)} asChild>
        <Link href={`/${inputValue}`}>Go</Link>
      </Button>
    </div>
  );
};

export default AppSearch;
