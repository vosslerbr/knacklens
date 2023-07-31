import Head from "next/head";
import { NextPageWithLayout } from "../../_app";
import Layout from "@/components/Layout";
import { ReactElement, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { TabView, TabPanel } from "primereact/tabview";
import { ProgressSpinner } from "primereact/progressspinner";
import Metadata from "@/components/Metadata";
import Objects from "@/components/Objects";
import Scenes from "@/components/Scenes";
import { AppContext, AppDataContext } from "@/components/Store";

const ObjectDetail: NextPageWithLayout = () => {
  // get the id from the url
  const { id } = useRouter().query;

  console.log("KEY: ", id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { appData, setAppData } = useContext(AppContext) as AppDataContext;

  return (
    <>
      <Head>
        <title>KnackLens | {appData?.application?.name}</title>
        <meta name="description" content="Easily view Knack application metadata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>OBJECTS</main>
    </>
  );
};

ObjectDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ObjectDetail;
