import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { KnackAppData } from "./Store";

const Scenes = ({ appData }: { appData: KnackAppData }) => {
  const [search, setSearch] = useState("");
  const [filteredAppData, setFilteredAppData] = useState(appData.scenes);

  const router = useRouter();

  useEffect(() => {
    const filterAppData = () => {
      const filteredScenes = appData.scenes.filter((scene: any) => {
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
      <span className="text-xl text-900 font-bold">{appData.sceneCount} Total Scenes</span>
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
      emptyMessage="No scenes"
      scrollable
      scrollHeight="750px"
      selectionMode="single"
      virtualScrollerOptions={{ itemSize: 46 }}
      sortMode="multiple"
      onRowSelect={(e) => {
        const sceneKey = e.data.key;

        router.push(`/${appData.id}/scenes/${sceneKey}`);
      }}>
      <Column field="name" header="Name" sortable></Column>
      <Column field="key" header="Key" sortable></Column>
      <Column field="slug" header="Slug" sortable></Column>
      <Column field="views.length" header="Views" sortable></Column>
    </DataTable>
  );
};

export default Scenes;
