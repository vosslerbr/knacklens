import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Store";
import { AppDataContext } from "@/types";

const ScenesTable = ({ scenes }: { scenes: any[] }) => {
  const [search, setSearch] = useState("");
  const [filteredAppData, setFilteredAppData] = useState(scenes);

  const { appData } = useContext(AppContext) as AppDataContext;

  const router = useRouter();

  useEffect(() => {
    const filterAppData = () => {
      const filteredScenes = scenes.filter((scene: any) => {
        return (
          scene.name.toLowerCase().includes(search.trim().toLowerCase()) ||
          scene.key.toLowerCase().includes(search.trim().toLowerCase())
        );
      });

      console.log("FILTERED scenes: ", filteredScenes);

      setFilteredAppData(filteredScenes);
    };

    filterAppData();
  }, [search, scenes]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">{scenes.length} Scenes</span>
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
      paginator
      rows={10}
      rowsPerPageOptions={[10, 25, 50]}
      value={filteredAppData}
      header={header}
      emptyMessage="No scenes"
      selectionMode="single"
      sortMode="multiple"
      onRowSelect={(e) => {
        const sceneKey = e.data.key;

        router.push(`/${appData?.id}/scenes/${sceneKey}`);
      }}>
      <Column field="name" header="Name" sortable></Column>
      <Column field="key" header="Key" sortable></Column>
      <Column field="slug" header="Slug" sortable></Column>
      <Column field="views.length" header="Views" sortable></Column>
    </DataTable>
  );
};

export default ScenesTable;
