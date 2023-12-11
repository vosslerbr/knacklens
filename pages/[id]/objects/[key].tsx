import Layout from "@/components/Layout";
import PageLoading from "@/components/PageLoading";
import { AppContext } from "@/components/Store";
import FieldsTable from "@/components/tables/FieldsTable";
import { AppDataContext } from "@/types";
import getAppData from "@/utils/client/getAppData";
import Head from "next/head";
import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Panel } from "primereact/panel";
import { SelectButton } from "primereact/selectbutton";
import { ReactElement, useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";

const ObjectDetail: NextPageWithLayout = () => {
  // get the id from the url
  const objectKey = useRouter().query.key as string;
  const appId = useRouter().query.id as string;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [connectionTableShown, setConnectionTableShown] = useState("Outbound");

  const { appData, setAppData } = useContext(AppContext) as AppDataContext;

  const object = appData?.objectsByKey[objectKey];

  console.log("object: ", object);
  console.log("field: ", appData?.fieldsByKey[object?.identifier].name);

  useEffect(() => {
    const loadAppData = async () => {
      try {
        setLoading(true);

        const data = await getAppData(appId);

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

  const renderConnectionType = (connection: any) => {
    return (
      <>
        {connection.belongs_to} <i className="pi pi-arrow-right"></i> {connection.has}
      </>
    );
  };

  return (
    <>
      <Head>
        <title>KnackLens | {objectKey}</title>
        <meta name="description" content="Easily view Knack application metadata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!loading && appData ? (
          <>
            <div className="card">
              <h2 id="app-name">{appData?.appName}</h2>
              <h2 className="detail-title purple">{object.name}</h2>
              <div className="grid metadata">
                <Panel header="Key">
                  <p>{object.key}</p>
                </Panel>
                <Panel header="Identifier">
                  <p>{object.identifier}</p>
                </Panel>
                <Panel header="Records">
                  <p>{object.count.toLocaleString()}</p>
                </Panel>
                <Panel header="Sort Field">
                  <p>{object?.sort?.field || "None"}</p>
                </Panel>
                <Panel header="Sort Order">
                  <p>{object?.sort?.order || "None"}</p>
                </Panel>
              </div>
            </div>

            <div className="card">
              <h2 className="detail-title">Connections</h2>

              <div className="flex justify-content-center">
                <SelectButton
                  value={connectionTableShown}
                  onChange={(e) => setConnectionTableShown(e.value)}
                  options={["Outbound", "Inbound"]}
                  className="mb-4"
                />
              </div>

              {connectionTableShown === "Inbound" ? (
                <DataTable
                  paginator
                  rows={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  value={object.connections.inbound}
                  emptyMessage="No inbound connections"
                  selectionMode="single"
                  sortMode="multiple"
                  onRowSelect={(e) => {
                    const objectKey = e.data.object;

                    router.push(`/${appData.id}/objects/${objectKey}`);
                  }}>
                  <Column field="name" header="Name" sortable></Column>
                  <Column field="key" header="Field" sortable></Column>
                  <Column field="object" header="From" sortable></Column>
                  <Column field="type" header="Type" body={renderConnectionType}></Column>
                </DataTable>
              ) : (
                <DataTable
                  paginator
                  rows={10}
                  rowsPerPageOptions={[10, 25, 50]}
                  value={object.connections.outbound}
                  emptyMessage="No outbound connections"
                  selectionMode="single"
                  sortMode="multiple"
                  onRowSelect={(e) => {
                    const objectKey = e.data.object;

                    router.push(`/${appData.id}/objects/${objectKey}`);
                  }}>
                  <Column field="name" header="Name" sortable></Column>
                  <Column field="key" header="Field" sortable></Column>
                  <Column field="object" header="To" sortable></Column>
                  <Column field="type" header="Type" body={renderConnectionType}></Column>
                </DataTable>
              )}
            </div>

            <div className="card">
              <h2 className="detail-title">Fields</h2>
              <FieldsTable fields={object.fields} />
            </div>
          </>
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
