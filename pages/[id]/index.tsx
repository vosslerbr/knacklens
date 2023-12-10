import Layout from "@/components/Layout";
import Metadata from "@/components/Metadata";
import PageLoading from "@/components/PageLoading";
import { AppContext } from "@/components/Store";
import { AppDataContext } from "@/types";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import { Button } from "primereact/button";

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
        <title>KnackLens | App Overview</title>
        <meta name="description" content="Easily view Knack application metadata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        {!loading && appData ? (
          <div className="card">
            <h2 id="app-name">{appData?.appName}</h2>
            <p id="app-desc">{appData?.appDescription}</p>

            <div id="app-links">
              <Link href={`/${appData.id}/objects`}>
                <Button label="Objects" />
              </Link>
              <Link href={`/${appData.id}/fields`}>
                <Button label="Fields" />
              </Link>
              <Link href={`/${appData.id}/scenes`}>
                <Button label="Scenes" />
              </Link>
              <Link href={`/${appData.id}/views`}>
                <Button label="Views" />
              </Link>
              <Link href={`/${appData.id}/tasks`}>
                <Button label="Tasks" />
              </Link>
              {/* //TODO */}
              {/* <Link href={`/${appData.id}/field-rules`}>
                <Button label="Field Rules" />
              </Link> */}
            </div>

            <Metadata appData={appData} />
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
