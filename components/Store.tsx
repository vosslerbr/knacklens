import React, { useState, createContext } from "react";

export const AppIdContext = createContext<string>("");
export const AppContext = createContext<any>(null);

type Props = {
  children: JSX.Element;
};

export default function Store({ children }: Props) {
  const [appData, setAppData] = useState<any>(null);
  const [knackAppId, setKnackAppId] = useState<string>("");

  return (
    <AppContext.Provider value={appData}>
      <AppIdContext.Provider value={knackAppId}>{children}</AppIdContext.Provider>
    </AppContext.Provider>
  );
}
