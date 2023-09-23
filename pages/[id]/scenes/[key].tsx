import Layout from "@/components/Layout";
import PageLoading from "@/components/PageLoading";
import { AppContext, AppDataContext } from "@/components/Store";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ReactElement, useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import { Panel } from "primereact/panel";

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
        <title>KnackLens</title>
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
              <Panel header="Key">
                <p>{appData.scenesByKey[sceneKey].key}</p>
              </Panel>
              <Panel header="Slug">
                <p>{appData.scenesByKey[sceneKey].slug}</p>
              </Panel>
              <Panel header="Parent Slug">
                <p>{appData.scenesByKey[sceneKey].parent}</p>
              </Panel>
              <Panel header="Display in Menu">
                <p>{appData.scenesByKey[sceneKey].page_menu_display ? "Yes" : "No"}</p>
              </Panel>
              <Panel header="Open in Modal">
                <p>{appData.scenesByKey[sceneKey].modal ? "Yes" : "No"}</p>
              </Panel>
            </div>
            <DataTable
              paginator
              rows={10}
              rowsPerPageOptions={[10, 25, 50]}
              className="mb-6 mt-6"
              value={appData.scenesByKey[sceneKey].rules}
              header="Page Rules"
              emptyMessage="No rules"
              selectionMode="single"
              sortMode="multiple"
              onRowSelect={(e) => {
                const objectKey = e.data.object;

                console.log("objectKey: ", objectKey);
              }}>
              <Column field="action" header="Action" sortable></Column>
            </DataTable>

            <DataTable
              paginator
              rows={10}
              rowsPerPageOptions={[10, 25, 50]}
              className="mb-6 mt-6"
              value={appData.scenesByKey[sceneKey].views}
              header="Views"
              emptyMessage="No views"
              selectionMode="single"
              sortMode="multiple"
              onRowSelect={(e) => {
                const objectKey = e.data.object;

                console.log("objectKey: ", objectKey);
              }}>
              <Column field="name" header="Name" sortable></Column>
              <Column field="key" header="Key" sortable></Column>
              <Column field="type" header="Type" sortable></Column>
            </DataTable>
          </div>
        ) : (
          <PageLoading />
        )}
      </main>
    </>
  );
};

SceneDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SceneDetail;
