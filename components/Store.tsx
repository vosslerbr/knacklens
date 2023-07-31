import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export type KnackIDContext = {
  knackAppId: string;
  setKnackAppId: React.Dispatch<React.SetStateAction<string>>;
};

export type AppDataContext = {
  appData: any;
  setAppData: React.Dispatch<React.SetStateAction<any>>;
};

export const AppIdContext = createContext<KnackIDContext | null>(null);
export const AppContext = createContext<AppDataContext | null>(null);

type Props = {
  children: JSX.Element;
};

export default function Store({ children }: Props) {
  const [appData, setAppData] = useState<any>(null);
  const [knackAppId, setKnackAppId] = useState<string>("");

  return (
    <AppContext.Provider value={{ appData, setAppData }}>
      <AppIdContext.Provider value={{ knackAppId, setKnackAppId }}>
        {children}
      </AppIdContext.Provider>
    </AppContext.Provider>
  );
}
