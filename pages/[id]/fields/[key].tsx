import Layout from "@/components/Layout";
import PageLoading from "@/components/PageLoading";
import { AppContext, AppDataContext } from "@/components/Store";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable, DataTableExpandedRows, DataTableValueArray } from "primereact/datatable";
import { ReactElement, useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";
import Link from "next/link";
import { Panel } from "primereact/panel";
import CheckOrX from "@/components/CheckOrX";

const FieldDetail: NextPageWithLayout = () => {
  // get the id from the url
  const fieldKey = useRouter().query.key as string;
  const appId = useRouter().query.id as string;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);

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

  const allowExpansion = (rowData: any) => {
    return rowData.criteria.length > 0;
  };

  // TODO add typing
  const rowExpansionTemplate = (data: any) => {
    return (
      <div className="p-3">
        <h5>Criteria</h5>
        <DataTable value={data.criteria}>
          <Column field="field" header="Field" sortable></Column>
          <Column field="operator" header="Operator" sortable></Column>
          <Column field="value" header="Value" sortable></Column>
        </DataTable>
      </div>
    );
  };

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
            <h2 className="detail-title purple">{appData.fieldsByKey[fieldKey].name}</h2>
            {/* <p className="detail-p">Field</p> */}
            <div className="grid metadata">
              <Panel header="Key">
                <p>{appData.fieldsByKey[fieldKey].key}</p>
              </Panel>
              <Panel header="Type">
                <p>{appData.fieldsByKey[fieldKey].type}</p>
              </Panel>

              <Panel header="Object">
                <Link href={`/${appId}/objects/${appData.fieldsByKey[fieldKey].object_key}`}>
                  <p>{appData.fieldsByKey[fieldKey].object_key}</p>
                </Link>
              </Panel>

              <Panel header="Required">
                <CheckOrX value={appData.fieldsByKey[fieldKey].required} />
              </Panel>
              <Panel header="Unique">
                <CheckOrX value={appData.fieldsByKey[fieldKey].unique} />
              </Panel>
            </div>

            {appData.fieldsByKey[fieldKey]?.format?.options?.length > 0 && (
              <DataTable
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25, 50]}
                className="mb-6 mt-6"
                value={appData.fieldsByKey[fieldKey].format.options.map((option: string) => ({
                  val: option,
                }))}
                header="Field Options"
                emptyMessage="No field options">
                <Column field="val" sortable></Column>
              </DataTable>
            )}

            <DataTable
              paginator
              rows={10}
              rowsPerPageOptions={[10, 25, 50]}
              className="mb-6 mt-6"
              value={appData.fieldsByKey[fieldKey].validation}
              header="Validation Rules"
              emptyMessage="No validation rules"
              selectionMode="single"
              expandedRows={expandedRows}
              onRowToggle={(e) => setExpandedRows(e.data)}
              rowExpansionTemplate={rowExpansionTemplate}
              onRowSelect={(e) => {
                const objectKey = e.data.object;

                console.log("objectKey: ", objectKey);
              }}>
              <Column expander={allowExpansion} style={{ width: "5rem" }} />
              <Column field="message" header="Message" sortable></Column>
            </DataTable>
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
