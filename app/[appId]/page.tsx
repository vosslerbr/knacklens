"use client";

import { AppContext } from "@/components/Store";
import { AppDataContext } from "@/types";
import { getKnackAppData } from "@/utils/actions";

import { useContext, useEffect, useState } from "react";

const AppOverview = ({ params }: { params: { appId: string } }) => {
  const { appId } = params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { appData, setAppData } = useContext(AppContext) as AppDataContext;

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);

        const data = await getKnackAppData(appId);

        setAppData(data);

        // check for local storage
        const localData = localStorage.getItem("knackLens");

        const localDataObj = localData ? JSON.parse(localData) : [];

        const existingApp = localDataObj.find((app: any) => app.id === data?.id);

        if (!existingApp) {
          // add to local storage
          localDataObj.push({ id: data?.id, appName: data?.appName });

          console.log("localDataObj: ", localDataObj);

          localStorage.setItem("knackLens", JSON.stringify(localDataObj));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if ((appId && !appData) || appId !== appData?.id) {
      handleSearch();
    }
  }, [appId, setAppData, appData]);

  return (
    <>
      <main>
        {!loading && appData ? (
          <div className="card">
            <h2 id="app-name">Metadata</h2>
            <p>ID: {appId}</p>
            {/* <Metadata appData={appData} /> */}
          </div>
        ) : (
          <p>loading..</p>
          // <PageLoading />
        )}
      </main>
    </>
  );
};

export default AppOverview;
