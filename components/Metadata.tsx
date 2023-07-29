import { Card } from "primereact/card";
import { Tag } from "primereact/tag";

const Metadata = ({ appData }: { appData: any }) => {
  const { application } = appData;

  return (
    <div className="grid metadata">
      <Card title="Slug">
        <p>{application.slug}</p>
      </Card>
      <Card title="Home Scene">
        <p>{application.home_scene.key}</p>
      </Card>
      <Card title="Home Slug">
        <p>{application.home_scene.slug}</p>
      </Card>
      <Card title="# of Objects">
        <p>{application.objects.length.toLocaleString()}</p>
      </Card>
      <Card title="# of Scenes">
        <p>{application.scenes.length.toLocaleString()}</p>
      </Card>
      <Card title="API Limit">
        <p>{application.account.plan_limits.api_limit.toLocaleString()} requests</p>
      </Card>
      <Card title="E-commerce">
        {application.ecommerce.enabled ? (
          <Tag value="Enabled" severity="success" />
        ) : (
          <Tag value="Disabled" severity="danger" />
        )}
      </Card>
      <Card title="Timezone">
        <p>{application.settings.timezone}</p>
      </Card>
      <Card title="Users">
        {application.users.enabled ? (
          <Tag value="Enabled" severity="success" />
        ) : (
          <Tag value="Disabled" severity="danger" />
        )}
      </Card>
    </div>
  );
};

export default Metadata;
