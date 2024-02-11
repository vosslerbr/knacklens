import YesNoTag from "@/components/YesNoTag";
import { Panel } from "primereact/panel";

const TableDetails = ({ viewDetails }: { viewDetails: any }) => {
  return (
    <>
      <div className="grid metadata">
        <Panel header="Key">
          <p>{viewDetails.key}</p>
        </Panel>
        <Panel header="Title">
          <p>{viewDetails.title}</p>
        </Panel>
        <Panel header="Type">
          <p>{viewDetails.type}</p>
        </Panel>
        {/* // TODO link to object page */}
        <Panel header="Source">
          <p>{viewDetails.source?.object}</p>
        </Panel>
        <Panel header="Hide Fields">
          <YesNoTag value={viewDetails.hide_fields} />
        </Panel>
      </div>
    </>
  );
};

export default TableDetails;
