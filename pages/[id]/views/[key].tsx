import Layout from "@/components/Layout";
import PageLoading from "@/components/PageLoading";
import DetailDetails from "@/components/details/views/Details";
import LoginViewDetails from "@/components/details/views/Login";
import RichTextDetails from "@/components/details/views/RichText";
import TableDetails from "@/components/details/views/Table";
import useKnackAppData from "@/utils/hooks/useKnackAppData";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";

const ViewDetail: NextPageWithLayout = () => {
  // get the id from the url
  const viewKey = useRouter().query.key as string;
  const appId = useRouter().query.id as string;

  const { appData, loading } = useKnackAppData(appId);

  const viewDetails = appData?.viewsByKey[viewKey];

  console.log("VIEW DETAILS: ", viewDetails);

  const renderDetails = (viewType: string) => {
    switch (viewType) {
      case "rich_text":
        return <RichTextDetails viewDetails={viewDetails} />;
      case "login":
        return <LoginViewDetails viewDetails={viewDetails} />;
      case "form":
        return <></>;
      case "details":
        return <DetailDetails viewDetails={viewDetails} />;
      case "table":
        return <TableDetails viewDetails={viewDetails} />;
      case "calendar":
        return <></>;
      case "search":
        return <></>;
      case "list":
        return <></>;
      case "menu":
        return <></>;
      case "charge":
        return <></>;
      case "customer":
        return <></>;
      case "map":
        return <></>;
      case "registration":
        return <></>;
      case "report":
        return <></>;
      default:
        return <></>;
    }
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
            <h2 id="app-name">View</h2>
            <h2 className="detail-title purple">{viewDetails.name}</h2>

            {renderDetails(viewDetails.type)}
          </div>
        ) : (
          <PageLoading />
        )}
      </main>
    </>
  );
};

ViewDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ViewDetail;
