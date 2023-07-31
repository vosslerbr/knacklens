import Head from "next/head";
import { NextPageWithLayout } from "../_app";
import Layout from "@/components/Layout";
import { ReactElement, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { TabView, TabPanel } from "primereact/tabview";
import { ProgressSpinner } from "primereact/progressspinner";
import Metadata from "@/components/Metadata";
import Objects from "@/components/Objects";
import Scenes from "@/components/Scenes";
import { AppContext, AppDataContext } from "@/components/Store";

const AppView: NextPageWithLayout = () => {
  // get the id from the url
  const { id } = useRouter().query;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { appData, setAppData } = useContext(AppContext) as AppDataContext;

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`https://api.knack.com/v1/applications/${id}`);

        console.log("HELLO: ", data);

        setAppData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id && !appData) {
      handleSearch();
    }
  }, [id, setAppData, appData]);

  return (
    <>
      <Head>
        <title>KnackLens | {appData?.application?.name}</title>
        <meta name="description" content="Easily view Knack application metadata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!loading && appData ? (
          <div className="card">
            <h2 id="app-name">{appData?.application?.name}</h2>
            <TabView>
              <TabPanel header="Metadata">
                <Metadata appData={appData} />
              </TabPanel>
              <TabPanel header="Objects">
                <Objects appData={appData} />
              </TabPanel>
              <TabPanel header="Fields">
                <p>FIELDS TODO</p>
              </TabPanel>
              <TabPanel header="Scenes">
                <Scenes appData={appData} />
              </TabPanel>
              <TabPanel header="Views">
                <p>VIEWS TODO</p>
              </TabPanel>
              <TabPanel header="Tasks">
                <p>TASKS TODO</p>
              </TabPanel>
            </TabView>
          </div>
        ) : (
          <ProgressSpinner />
        )}
      </main>
    </>
  );
};

AppView.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AppView;
