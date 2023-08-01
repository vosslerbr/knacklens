import Layout from "@/components/Layout";
import { AppContext, AppDataContext } from "@/components/Store";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { ProgressSpinner } from "primereact/progressspinner";
import { ReactElement, useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";

const SceneDetail: NextPageWithLayout = () => {
  // get the id from the url
  const sceneKey = useRouter().query.key as string;
  const appId = useRouter().query.id as string;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { appData, setAppData } = useContext(AppContext) as AppDataContext;

  useEffect(() => {
    const loadAppData = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`/api/app-data?id=${appId}`);

        console.log("HELLO: ", data);

        setAppData(data);
      } catch (error) {
        console.error(error);

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    // if we have an id but no appData, load the appData. This likely means we refreshed the page or navigated directly to the url
    if (appId && !appData) {
      loadAppData();
    }
  }, [appId, setAppData, appData]);

  return (
    <>
      <Head>
        <title>KnackLens | {appData?.appName}</title>
        <meta name="description" content="Easily view Knack application metadata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!loading && appData ? (
          <div className="card">
            <h2 id="app-name">{appData?.appName}</h2>
            <h2 className="detail-title purple">{appData.scenesByKey[sceneKey].name}</h2>
            <div className="grid metadata">
              <Card title="Key">
                <p>{appData.scenesByKey[sceneKey].key}</p>
              </Card>
              <Card title="Slug">
                <p>{appData.scenesByKey[sceneKey].slug}</p>
              </Card>
              <Card title="Parent Slug">
                <p>{appData.scenesByKey[sceneKey].parent}</p>
              </Card>
              <Card title="Display in Menu">
                <p>{appData.scenesByKey[sceneKey].page_menu_display ? "Yes" : "No"}</p>
              </Card>
              <Card title="Open in Modal">
                <p>{appData.scenesByKey[sceneKey].modal ? "Yes" : "No"}</p>
              </Card>
            </div>
            <DataTable
              className="mb-6 mt-6"
              value={appData.scenesByKey[sceneKey].rules}
              header="Page Rules"
              emptyMessage="No rules"
              scrollable
              scrollHeight="750px"
              selectionMode="single"
              onRowSelect={(e) => {
                const objectKey = e.data.object;

                console.log("objectKey: ", objectKey);
              }}>
              <Column field="action" header="Action"></Column>
            </DataTable>

            <DataTable
              className="mb-6 mt-6"
              value={appData.scenesByKey[sceneKey].views}
              header="Views"
              emptyMessage="No views"
              scrollable
              scrollHeight="750px"
              selectionMode="single"
              onRowSelect={(e) => {
                const objectKey = e.data.object;

                console.log("objectKey: ", objectKey);
              }}>
              <Column field="name" header="Name"></Column>
              <Column field="key" header="Key"></Column>
              <Column field="type" header="Type"></Column>
            </DataTable>
          </div>
        ) : (
          <ProgressSpinner />
        )}
      </main>
    </>
  );
};

SceneDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SceneDetail;
