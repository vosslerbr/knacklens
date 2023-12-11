import Layout from "@/components/Layout";
import PageLoading from "@/components/PageLoading";
import { AppContext } from "@/components/Store";
import YesNoTag from "@/components/YesNoTag";
import { AppDataContext } from "@/types";
import getAppData from "@/utils/client/getAppData";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Panel } from "primereact/panel";
import { ReactElement, useContext, useEffect, useState } from "react";
import { NextPageWithLayout } from "../../_app";

const TaskDetail: NextPageWithLayout = () => {
  // get the id from the url
  const taskKey = useRouter().query.key as string;
  const appId = useRouter().query.id as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { appData, setAppData } = useContext(AppContext) as AppDataContext;

  const task = appData?.tasksByKey[taskKey];

  useEffect(() => {
    const loadAppData = async () => {
      try {
        setLoading(true);

        const data = await getAppData(appId);

        console.log("tasksByKey: ", data.tasksByKey);

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

  // TODO need to show what action the task is performing

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
            <h2 id="app-name">Task</h2>
            <h2 className="detail-title purple">{task.name}</h2>
            {/* <p className="detail-p">Field</p> */}
            <div className="grid metadata">
              <Panel header="Key">
                <p>{task.key}</p>
              </Panel>
              <Panel header="Object">
                <Link href={`/${appId}/objects/${task.object_key}`}>
                  <p>{task.object_key}</p>
                </Link>
              </Panel>

              <Panel header="Frequency">
                <p>
                  {task.schedule.repeat} at {task.schedule.time}
                </p>
              </Panel>
              <Panel header="Next Run">
                <p>{task.schedule.date}</p>
              </Panel>
              <Panel header="Scheduled">
                <YesNoTag value={task.scheduled} />
              </Panel>
              <Panel header="Running">
                <YesNoTag value={task.run_status === "running"} />
              </Panel>
            </div>
          </div>
        ) : (
          <PageLoading />
        )}
      </main>
    </>
  );
};

TaskDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TaskDetail;
