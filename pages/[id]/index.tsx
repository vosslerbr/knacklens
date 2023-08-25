import Layout from "@/components/Layout";
import Metadata from "@/components/Metadata";
import Objects from "@/components/Objects";
import PageLoading from "@/components/PageLoading";
import Scenes from "@/components/Scenes";
import { AppContext, AppDataContext } from "@/components/Store";
import Tasks from "@/components/Tasks";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { TabPanel, TabView } from "primereact/tabview";
import { ReactElement, useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import Fields from "@/components/Fields";

const AppView: NextPageWithLayout = () => {
  // get the id from the url
  const id = useRouter().query.id as string;

  console.log("ID: ", id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { appData, setAppData } = useContext(AppContext) as AppDataContext;

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`/api/app-data?id=${id}`);

        console.log("HELLO: ", data);
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

    if ((id && !appData) || id !== appData?.id) {
      handleSearch();
    }
  }, [id, setAppData, appData]);

  return (
    <>
      <Head>
        <title>KnackLens</title>
        <meta name="description" content="Easily view Knack application metadata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        {!loading && appData ? (
          <div className="card">
            <h2 id="app-name">{appData?.appName}</h2>
            <TabView>
              <TabPanel header="Metadata">
                <Metadata appData={appData} />
              </TabPanel>
              <TabPanel header="Objects">
                <Objects appData={appData} />
              </TabPanel>
              <TabPanel header="Fields">
                <Fields appData={appData} />
              </TabPanel>
              <TabPanel header="Scenes">
                <Scenes appData={appData} />
              </TabPanel>
              <TabPanel header="Views">
                <p>VIEWS TODO</p>
              </TabPanel>
              <TabPanel header="Tasks">
                <Tasks appData={appData} />
              </TabPanel>
            </TabView>
          </div>
        ) : (
          <PageLoading />
        )}
      </main>
    </>
  );
};

AppView.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AppView;
