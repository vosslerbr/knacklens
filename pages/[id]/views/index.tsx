import Layout from "@/components/Layout";
import PageLoading from "@/components/PageLoading";
import { AppContext } from "@/components/Store";
import ViewsTable from "@/components/tables/ViewsTable";
import { AppDataContext } from "@/types";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";

const ViewsPage: NextPageWithLayout = () => {
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
        <title>KnackLens | Views</title>
        <meta name="description" content="Easily view Knack application metadata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        {!loading && appData ? (
          <div className="card">
            <h2 id="app-name">{appData?.appName}</h2>
            <h3 id="app-desc">Views</h3>

            <ViewsTable views={appData.views} />
          </div>
        ) : (
          <PageLoading />
        )}
      </main>
    </>
  );
};

ViewsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ViewsPage;
