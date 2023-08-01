import Layout from "@/components/Layout";
import PageLoading from "@/components/PageLoading";
import { AppContext, AppDataContext } from "@/components/Store";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ReactElement, useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";

const ObjectDetail: NextPageWithLayout = () => {
  // get the id from the url
  const objectKey = useRouter().query.key as string;
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
            <h2 className="detail-title purple">{appData.objectsByKey[objectKey].name}</h2>
            <div className="grid metadata">
              <Card title="Key">
                <p>{appData.objectsByKey[objectKey].key}</p>
              </Card>
              <Card title="Identifier">
                <p>{appData.objectsByKey[objectKey].identifier}</p>
              </Card>
              <Card title="Records">
                <p>{appData.objectsByKey[objectKey].count.toLocaleString()}</p>
              </Card>
              <Card title="Sort Field">
                <p>{appData.objectsByKey[objectKey].sort.field}</p>
              </Card>
              <Card title="Sort Order">
                <p>{appData.objectsByKey[objectKey].sort.order}</p>
              </Card>
            </div>
            <DataTable
              className="mb-6 mt-6"
              value={appData.objectsByKey[objectKey].connections.outbound}
              header="Outbound Connections"
              emptyMessage="No outbound connections"
              scrollable
              scrollHeight="750px"
              selectionMode="single"
              onRowSelect={(e) => {
                const objectKey = e.data.object;

                router.push(`/${appData.id}/objects/${objectKey}`);
              }}>
              <Column field="name" header="Name"></Column>
              <Column field="key" header="Field"></Column>
              <Column field="object" header="To"></Column>
              <Column field="belongs_to" header="Belongs To"></Column>
              <Column field="has" header="Has"></Column>
            </DataTable>
            <DataTable
              className="mb-6"
              value={appData.objectsByKey[objectKey].connections.inbound}
              header="Inbound Connections"
              emptyMessage="No inbound connections"
              scrollable
              scrollHeight="750px"
              selectionMode="single"
              onRowSelect={(e) => {
                const objectKey = e.data.object;

                router.push(`/${appData.id}/objects/${objectKey}`);
              }}>
              <Column field="name" header="Name"></Column>
              <Column field="key" header="Field"></Column>
              <Column field="object" header="From"></Column>
              <Column field="belongs_to" header="Belongs To"></Column>
              <Column field="has" header="Has"></Column>
            </DataTable>
            <DataTable
              className="mb-6"
              value={appData.objectsByKey[objectKey].fields}
              header="Fields"
              emptyMessage="No fields"
              scrollable
              scrollHeight="750px"
              selectionMode="single"
              onRowSelect={(e) => {
                const fieldKey = e.data.key;

                console.log("fieldKey: ", fieldKey);
              }}>
              <Column field="name" header="Name"></Column>
              <Column field="key" header="Key"></Column>
              <Column field="type" header="Type"></Column>
              <Column field="required" header="Required"></Column>
              <Column field="unique" header="Unique"></Column>
            </DataTable>
          </div>
        ) : (
          <PageLoading />
        )}
      </main>
    </>
  );
};

ObjectDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ObjectDetail;
