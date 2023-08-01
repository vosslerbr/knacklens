import React, { useState, createContext } from "react";

export type KnackIDContext = {
  knackAppId: string;
  setKnackAppId: React.Dispatch<React.SetStateAction<string>>;
};

export type KnackAppData = {
  id: string;
  appName: string;
  appDescription: string;
  appSlug: string;
  homeSlug: string;
  homeSceneKey: string;
  usersEnabled: boolean;
  objectCount: number;
  sceneCount: number;
  ecommerceEnabled: boolean;
  apiLimit: number;
  appTimezone: string;
  recordCounts: { [key: string]: number };
  objects: any[];
  scenes: any[];
  objectsByKey: { [key: string]: any };
  scenesByKey: { [key: string]: any };
  fields: any[];
  fieldsByKey: { [key: string]: any };
  views: any[];
  viewsByKey: { [key: string]: any };
  tasks: any[];
  tasksByKey: { [key: string]: any };
};

export type AppDataContext = {
  appData: KnackAppData | null;
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
