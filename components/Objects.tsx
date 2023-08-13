import { KnackAppData } from "./Store";
import Table from "./Table";

const Objects = ({ appData }: { appData: KnackAppData }) => {
  const countRecords = (object: any) => {
    return appData.recordCounts[object.key].toLocaleString();
  };

  const headerTitle = (
    <span className="text-xl text-900 font-bold">{appData.objectCount} Total Objects</span>
  );

  return (
    <Table
      headerTitle={headerTitle}
      emptyMessage="No objects"
      appData={appData}
      countRecords={countRecords}
    />
  );
};

export default Objects;
