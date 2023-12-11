import Layout from "@/components/Layout";
import PageLoading from "@/components/PageLoading";
import { AppContext } from "@/components/Store";
import YesNoTag from "@/components/YesNoTag";
import { AppDataContext } from "@/types";
import getAppData from "@/utils/client/getAppData";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable, DataTableExpandedRows, DataTableValueArray } from "primereact/datatable";
import { Panel } from "primereact/panel";
import { TreeTable } from "primereact/treetable";
import { ReactElement, useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";

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

  const field = appData?.fieldsByKey[fieldKey];

  useEffect(() => {
    const loadAppData = async () => {
      try {
        setLoading(true);

        const data = await getAppData(appId);

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
    console.log("data: ", data);

    return (
      <div className="p-3">
        <h5>Criteria</h5>
        <DataTable value={data.criteria}>
          <Column field="field" header="Field" sortable></Column>
          <Column field="operator" header="Operator" sortable></Column>
          <Column field="value" header="Value" sortable></Column>
          <Column field="value_type" header="Value Type" sortable></Column>
          <Column field="value_field" header="Value Field" sortable></Column>
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
            <h2 className="detail-title purple">{field.name}</h2>
            {/* <p className="detail-p">Field</p> */}
            <div className="grid metadata">
              <Panel header="Key">
                <p>{field.key}</p>
              </Panel>

              <Panel header="Object">
                <Link href={`/${appId}/objects/${field.object_key}`}>
                  <p>{field.object_key}</p>
                </Link>
              </Panel>

              <Panel header="Type">
                <p>{field.type}</p>
              </Panel>

              {field.type === "multiple_choice" && (
                <Panel header="Selection Type">
                  <p>{field.format.type}</p>
                </Panel>
              )}

              <Panel header="Required">
                <YesNoTag value={field.required} />
              </Panel>
              <Panel header="Unique">
                <YesNoTag value={field.unique} />
              </Panel>
            </div>
            {field?.format?.options?.length > 0 && (
              <DataTable
                header="Field Options"
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25, 50]}
                className="mb-6 mt-6"
                value={field.format.options.map((option: string) => ({
                  val: option,
                }))}
                emptyMessage="No field options">
                <Column field="val" sortable></Column>
              </DataTable>
            )}

            {/* TODO */}
            <TreeTable
              header="Conditional Rules"
              paginator
              rows={10}
              rowsPerPageOptions={[10, 25, 50]}
              className="mb-6 mt-6"
              value={field.rules}
              emptyMessage="No conditional rules"
              selectionMode="single">
              <Column field="key" header="Rule Key" sortable></Column>
            </TreeTable>

            <DataTable
              header="Validation Rules"
              paginator
              rows={10}
              rowsPerPageOptions={[10, 25, 50]}
              className="mb-6 mt-6"
              value={field.validation}
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
