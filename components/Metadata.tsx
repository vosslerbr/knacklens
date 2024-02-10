import { KnackAppData } from "@/types";
import YesNoTag from "./YesNoTag";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Metadata = ({ appData }: { appData: KnackAppData }) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Slug</CardTitle>
        </CardHeader>
        <CardContent>{appData.appSlug}</CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Home Scene</CardTitle>
        </CardHeader>
        <CardContent>{appData.homeSceneKey}</CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Home Slug</CardTitle>
        </CardHeader>
        <CardContent>{appData.homeSlug}</CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Objects</CardTitle>
        </CardHeader>
        <CardContent>{appData.objectCount.toLocaleString()}</CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Total Records</CardTitle>
        </CardHeader>
        <CardContent>{appData.recordCounts.total_entries.toLocaleString()}</CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Scenes</CardTitle>
        </CardHeader>
        <CardContent>{appData.sceneCount.toLocaleString()}</CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>API Limit</CardTitle>
        </CardHeader>
        <CardContent>{appData.apiLimit.toLocaleString()} requests</CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Timezone</CardTitle>
        </CardHeader>
        <CardContent>{appData.appTimezone}</CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>E-commerce</CardTitle>
        </CardHeader>
        <CardContent>
          <YesNoTag value={appData.ecommerceEnabled} trueLabel="Enabled" falseLabel="Disabled" />
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <YesNoTag value={appData.usersEnabled} trueLabel="Enabled" falseLabel="Disabled" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Metadata;
