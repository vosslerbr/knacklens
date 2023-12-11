import Layout from "@/components/Layout";
import PageLoading from "@/components/PageLoading";
import { AppContext } from "@/components/Store";
import DetailDetails from "@/components/details/views/Details";
import LoginViewDetails from "@/components/details/views/Login";
import RichTextDetails from "@/components/details/views/RichText";
import { AppDataContext } from "@/types";
import getAppData from "@/utils/client/getAppData";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";

const ViewDetail: NextPageWithLayout = () => {
  // get the id from the url
  const viewKey = useRouter().query.key as string;
  const appId = useRouter().query.id as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { appData, setAppData } = useContext(AppContext) as AppDataContext;
  const viewDetails = appData?.viewsByKey[viewKey];

  console.log("VIEW DETAILS: ", viewDetails);

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
        return <></>;
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
            <h2 id="app-name">{appData?.appName}</h2>
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
