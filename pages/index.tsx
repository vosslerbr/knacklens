import Head from "next/head";
import { NextPageWithLayout } from "./_app";
import AppSearch from "@/components/AppSearch";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>KnackLens</title>
        <meta name="description" content="Easily view Knack application metadata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id="intro">
        <div>
          <h2 id="intro-heading">
            Welcome to <span className="purple">KnackLens</span>
          </h2>
          <p>Use this tool to view metadata for any Knack application</p>
          <AppSearch />
        </div>
      </main>
    </>
  );
};

export default Home;
