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

const FieldDetail: NextPageWithLayout = () => {
  // get the id from the url
  const fieldKey = useRouter().query.key as string;
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

        console.log("fieldsByKey: ", data.fieldsByKey);

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
            <h2 className="detail-title purple">{appData.fieldsByKey[fieldKey].name}</h2>
            {/* <p className="detail-p">Field</p> */}
            <div className="grid metadata">
              <Card title="Key">
                <p>{appData.fieldsByKey[fieldKey].key}</p>
              </Card>
              <Card title="Type">
                <p>{appData.fieldsByKey[fieldKey].type}</p>
              </Card>
              <Card title="Object">
                <p>{appData.fieldsByKey[fieldKey].object_key}</p>
              </Card>
              <Card title="Required">
                <p>{appData.fieldsByKey[fieldKey].required ? "Yes" : "No"}</p>
              </Card>
              <Card title="Unique">
                <p>{appData.fieldsByKey[fieldKey].unique ? "Yes" : "No"}</p>
              </Card>
            </div>
            {/* <DataTable
              className="mb-6 mt-6"
              value={appData.fieldsByKey[fieldKey].rules}
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
            </DataTable> */}
          </div>
        ) : (
          <PageLoading />
        )}
      </main>
    </>
  );
};

FieldDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default FieldDetail;
