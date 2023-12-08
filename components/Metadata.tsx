import { KnackAppData } from "@/types";
import { Panel } from "primereact/panel";
import { Tag } from "primereact/tag";

const Metadata = ({ appData }: { appData: KnackAppData }) => {
  return (
    <div className="grid metadata">
      <Panel header="Slug">
        <p>{appData.appSlug}</p>
      </Panel>
      <Panel header="Home Scene">
        <p>{appData.homeSceneKey}</p>
      </Panel>
      <Panel header="Home Slug">
        <p>{appData.homeSlug}</p>
      </Panel>
      <Panel header="Objects">
        <p>{appData.objectCount.toLocaleString()}</p>
      </Panel>
      <Panel header="Total Records">
        <p>{appData.recordCounts.total_entries.toLocaleString()}</p>
      </Panel>
      <Panel header="Scenes">
        <p>{appData.sceneCount.toLocaleString()}</p>
      </Panel>
      <Panel header="API Limit">
        <p>{appData.apiLimit.toLocaleString()} requests</p>
      </Panel>
      <Panel header="Timezone">
        <p>{appData.appTimezone}</p>
      </Panel>
      <Panel header="E-commerce">
        {appData.ecommerceEnabled ? (
          <Tag value="Enabled" severity="success" />
        ) : (
          <Tag value="Disabled" severity="danger" />
        )}
      </Panel>

      <Panel header="Users">
        {appData.usersEnabled ? (
          <Tag value="Enabled" severity="success" />
        ) : (
          <Tag value="Disabled" severity="danger" />
        )}
      </Panel>
    </div>
  );
};

export default Metadata;
