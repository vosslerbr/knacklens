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

const ObjectDetail: NextPageWithLayout = () => {
  // get the id from the url
  const objectKey = useRouter().query.key as string;
  const appId = useRouter().query.id as string;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [objectData, setObjectData] = useState<{ [key: string]: any } | null>(null);

  const { appData, setAppData } = useContext(AppContext) as AppDataContext;

  useEffect(() => {
    const loadAppData = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`https://api.knack.com/v1/applications/${appId}`);

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

  useEffect(() => {
    const objectsByKey = appData?.application?.objects?.reduce(
      (acc: { [key: string]: any }, object: { [key: string]: any }) => {
        acc[object.key] = object;

        return acc;
      },
      {}
    );

    console.log("objectsByKey: ", objectsByKey);

    setObjectData(objectsByKey);
  }, [appData]);

  return (
    <>
      <Head>
        <title>KnackLens | {appData?.application?.name}</title>
        <meta name="description" content="Easily view Knack application metadata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!loading && appData && objectData ? (
          <>
            <h2>{objectData[objectKey].name}</h2>
            <DataTable
              className="mb-4"
              value={objectData[objectKey].connections.outbound}
              header="Outbound Connections"
              scrollable
              scrollHeight="750px"
              selectionMode="single"
              onRowSelect={(e) => {
                const objectKey = e.data.object;

                router.push(`/${appData.application.id}/objects/${objectKey}`);
              }}>
              <Column field="name" header="Name"></Column>
              <Column field="key" header="Field"></Column>
              <Column field="object" header="To"></Column>
              <Column field="belongs_to" header="Belongs To"></Column>
              <Column field="has" header="Has"></Column>
            </DataTable>
            <DataTable
              className="mb-4"
              value={objectData[objectKey].connections.inbound}
              header="Inbound Connections"
              scrollable
              scrollHeight="750px"
              selectionMode="single"
              onRowSelect={(e) => {
                const objectKey = e.data.object;

                router.push(`/${appData.application.id}/objects/${objectKey}`);
              }}>
              <Column field="name" header="Name"></Column>
              <Column field="key" header="Field"></Column>
              <Column field="object" header="From"></Column>
              <Column field="belongs_to" header="Belongs To"></Column>
              <Column field="has" header="Has"></Column>
            </DataTable>
            <DataTable
              className="mb-4"
              value={objectData[objectKey].fields}
              header="Fields"
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
          </>
        ) : (
          <ProgressSpinner />
        )}
      </main>
    </>
  );
};

ObjectDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ObjectDetail;
