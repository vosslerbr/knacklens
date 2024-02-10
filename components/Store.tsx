"use client";

import { AppDataContext, KnackAppData, KnackIDContext } from "@/types";
import { createContext, useState } from "react";

export const AppIdContext = createContext<KnackIDContext | null>(null);
export const AppContext = createContext<AppDataContext | null>(null);

type Props = {
  children: React.ReactNode;
};

export default function Store({ children }: Props) {
  const [appData, setAppData] = useState<KnackAppData | null>(null);
  const [knackAppId, setKnackAppId] = useState<string>("");

  return (
    <AppContext.Provider value={{ appData, setAppData }}>
      <AppIdContext.Provider value={{ knackAppId, setKnackAppId }}>
        {children}
      </AppIdContext.Provider>
    </AppContext.Provider>
  );
}
