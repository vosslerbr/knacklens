import Head from "next/head";
import { NextPageWithLayout } from "./_app";
import Layout from "@/components/Layout";
import { ReactElement } from "react";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>KnackLens</title>
        <meta name="description" content="Easily view Knack application metadata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="intro">
          <h2>
            Welcome to <span className="purple">KnackLens</span>
          </h2>
          <p>
            Use this tool to view metadata such as Objects, Fields, Scenes, and Views for any Knack
            application.
          </p>
          <p className="callout">Enter a Knack App ID to get started</p>
        </div>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
