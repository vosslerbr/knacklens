import CheckOrX from "@/components/CheckOrX";
import { Panel } from "primereact/panel";

const DetailDetails = ({ viewDetails }: { viewDetails: any }) => {
  return (
    <>
      <div className="grid metadata">
        <Panel header="Key">
          <p>{viewDetails.key}</p>
        </Panel>
        <Panel header="Type">
          <p>{viewDetails.type}</p>
        </Panel>
        {/* // TODO link to object page */}
        <Panel header="Source">
          <p>{viewDetails.source?.object}</p>
        </Panel>
        <Panel header="Hide Fields">
          <CheckOrX value={viewDetails.hide_fields} />
        </Panel>
        <Panel header="Layout">
          <p>{viewDetails.layout}</p>
        </Panel>
        <Panel header="Label Format">
          <p>{viewDetails.label_format}</p>
        </Panel>
      </div>
    </>
  );
};

export default DetailDetails;
