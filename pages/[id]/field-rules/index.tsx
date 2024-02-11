import Layout from "@/components/Layout";
import PageLoading from "@/components/PageLoading";
import FieldRulesTable from "@/components/tables/FieldRulesTable";
import useKnackAppData from "@/utils/hooks/useKnackAppData";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";

const FieldRulesPage: NextPageWithLayout = () => {
  // get the id from the url
  const id = useRouter().query.id as string;

  const { appData, loading } = useKnackAppData(id);

  return (
    <>
      <Head>
        <title>KnackLens | Field Rules</title>
        <meta name="description" content="Easily view Knack application metadata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        {!loading && appData ? (
          <div className="card">
            <h2 id="app-name">{appData?.appName}</h2>
            <h3 id="app-desc">Field Rules</h3>

            <FieldRulesTable fieldRules={appData.fieldRules} />
          </div>
        ) : (
          <PageLoading />
        )}
      </main>
    </>
  );
};

FieldRulesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default FieldRulesPage;
