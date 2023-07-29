import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

const Scenes = ({ appData }: { appData: any }) => {
  const [search, setSearch] = useState("");
  const [filteredAppData, setFilteredAppData] = useState(appData.application.scenes);

  useEffect(() => {
    const filterAppData = () => {
      const filteredScenes = appData.application.scenes.filter((scene: any) => {
        return (
          scene.name.toLowerCase().includes(search.trim().toLowerCase()) ||
          scene.key.toLowerCase().includes(search.trim().toLowerCase())
        );
      });

      console.log("FILTERED scenes: ", filteredScenes);

      setFilteredAppData(filteredScenes);
    };

    filterAppData();
  }, [search, appData]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">
        {appData.application.scenes.length} Total Scenes
      </span>
      <InputText
        placeholder="Search by name or key"
        type="text"
        className="w-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );

  return (
    <DataTable
      value={filteredAppData}
      header={header}
      scrollable
      scrollHeight="750px"
      selectionMode="single"
      onRowSelect={(e) => {
        const sceneKey = e.data.key;

        location.replace(`/${appData.application.id}/scenes/${sceneKey}`);
      }}>
      <Column field="name" header="Name"></Column>
      <Column field="key" header="Key"></Column>
      <Column field="slug" header="Slug"></Column>
      <Column field="views.length" header="Views"></Column>
    </DataTable>
  );
};

export default Scenes;
