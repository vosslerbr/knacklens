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
  fieldRules: any[];
  viewRules: any[];
};

export type AppDataContext = {
  appData: KnackAppData | null;
  setAppData: React.Dispatch<React.SetStateAction<any>>;
};
