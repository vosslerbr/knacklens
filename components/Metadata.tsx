import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { KnackAppData } from "./Store";

const Metadata = ({ appData }: { appData: KnackAppData }) => {
  return (
    <div className="grid metadata">
      <Card title="Slug">
        <p>{appData.appSlug}</p>
      </Card>
      <Card title="Home Scene">
        <p>{appData.homeSceneKey}</p>
      </Card>
      <Card title="Home Slug">
        <p>{appData.homeSlug}</p>
      </Card>
      <Card title="# of Objects">
        <p>{appData.objectCount.toLocaleString()}</p>
      </Card>
      <Card title="# of Scenes">
        <p>{appData.sceneCount.toLocaleString()}</p>
      </Card>
      <Card title="API Limit">
        <p>{appData.apiLimit.toLocaleString()} requests</p>
      </Card>
      <Card title="E-commerce">
        {appData.ecommerceEnabled ? (
          <Tag value="Enabled" severity="success" />
        ) : (
          <Tag value="Disabled" severity="danger" />
        )}
      </Card>
      <Card title="Timezone">
        <p>{appData.appTimezone}</p>
      </Card>
      <Card title="Users">
        {appData.usersEnabled ? (
          <Tag value="Enabled" severity="success" />
        ) : (
          <Tag value="Disabled" severity="danger" />
        )}
      </Card>
    </div>
  );
};

export default Metadata;
