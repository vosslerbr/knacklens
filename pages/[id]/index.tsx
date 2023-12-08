import Layout from "@/components/Layout";
import Metadata from "@/components/Metadata";
import PageLoading from "@/components/PageLoading";
import { AppContext } from "@/components/Store";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { TabPanel, TabView } from "primereact/tabview";
import { ReactElement, useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import FieldsTable from "@/components/tables/FieldsTable";
import ObjectsTable from "@/components/tables/ObjectsTable";
import ScenesTable from "@/components/tables/ScenesTable";
import TasksTable from "@/components/tables/TasksTable";
import { AppDataContext } from "@/types";
import FieldRulesTable from "@/components/tables/FieldRulesTable";
import ViewsTable from "@/components/tables/ViewsTable";

const AppView: NextPageWithLayout = () => {
  // get the id from the url
  const id = useRouter().query.id as string;

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
            <p id="app-desc">{appData?.appDescription}</p>
            <TabView>
              <TabPanel header="Metadata">
                <Metadata appData={appData} />
              </TabPanel>
              <TabPanel header="Objects">
                <ObjectsTable objects={appData.objects} />
              </TabPanel>
              <TabPanel header="Fields">
                <FieldsTable fields={appData.fields} />
              </TabPanel>
              <TabPanel header="FieldRules">
                <FieldRulesTable fieldRules={appData.fieldRules} />
              </TabPanel>
              <TabPanel header="Scenes">
                <ScenesTable scenes={appData.scenes} />
              </TabPanel>
              <TabPanel header="Views">
                <ViewsTable views={appData.views} />
              </TabPanel>
              <TabPanel header="Tasks">
                <TasksTable tasks={appData.tasks} />
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
