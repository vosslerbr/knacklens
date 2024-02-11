import { AppContext } from "@/components/Store";
import { AppDataContext } from "@/types";
import { useContext, useEffect, useState } from "react";
import getAppData from "../client/getAppData";

const useKnackAppData = (id: string) => {
  const { appData, setAppData } = useContext(AppContext) as AppDataContext;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);

        const data = await getAppData(id);

        setAppData(data);

        // check for local storage
        const localData = localStorage.getItem("knackLens");

        const localDataObj = localData ? JSON.parse(localData) : [];

        const existingApp = localDataObj.find((app: any) => app.id === data?.id);

        if (!existingApp) {
          // add to local storage
          localDataObj.push({ id: data?.id, appName: data?.appName });

          localStorage.setItem("knackLens", JSON.stringify(localDataObj));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if ((id && !appData) || id !== appData?.id) {
      handleSearch();
    }
  }, [id, setAppData, appData]);

  return { appData, loading };
};

export default useKnackAppData;
