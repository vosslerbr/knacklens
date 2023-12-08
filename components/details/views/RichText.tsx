import { Panel } from "primereact/panel";

const RichTextDetails = ({ viewDetails }: { viewDetails: any }) => {
  return (
    <>
      <div className="grid metadata">
        <Panel header="Key">
          <p>{viewDetails.key}</p>
        </Panel>
        <Panel header="Type">
          <p>{viewDetails.type}</p>
        </Panel>
      </div>
      <Panel header="Content">
        <div dangerouslySetInnerHTML={{ __html: viewDetails?.content }}></div>
      </Panel>
    </>
  );
};

export default RichTextDetails;
