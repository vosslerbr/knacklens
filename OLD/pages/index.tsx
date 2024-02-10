import Head from "next/head";
import { NextPageWithLayout } from "./_app";
import AppSearch from "@/components/AppSearch";
import { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import Link from "next/link";
import { Button } from "primereact/button";
import { AppIdContext } from "@/components/Store";
import { KnackIDContext } from "@/types";

const Home: NextPageWithLayout = () => {
  const { setKnackAppId } = useContext(AppIdContext) as KnackIDContext;
  const [pastSearches, setPastSearches] = useState<{ [key: string]: string }[]>([]);

  useEffect(() => {
    // check for local storage
    const localData = localStorage.getItem("knackLens");

    const localDataObj = localData ? JSON.parse(localData) : [];

    setPastSearches(localDataObj);
  }, []);

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
          <div className="grid past-searches">
            {pastSearches.map((search) => {
              return (
                <Card
                  title={search.appName}
                  subTitle={search.id}
                  key={search.id}
                  footer={
                    <Link href={`/${search.id}`}>
                      <Button label="View" onClick={() => setKnackAppId(search.id)} />
                    </Link>
                  }></Card>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
