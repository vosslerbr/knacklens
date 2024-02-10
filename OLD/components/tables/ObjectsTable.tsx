import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Store";
import { AppDataContext } from "@/types";

const ObjectsTable = ({ objects }: { objects: any[] }) => {
  const [search, setSearch] = useState("");
  const [filteredAppData, setFilteredAppData] = useState(objects);

  const { appData } = useContext(AppContext) as AppDataContext;

  const router = useRouter();

  useEffect(() => {
    const filterAppData = () => {
      const filteredObjects = objects.filter((object: any) => {
        return (
          object.name?.toLowerCase().includes(search.trim().toLowerCase()) ||
          object.key.toLowerCase().includes(search.trim().toLowerCase())
        );
      });

      console.log("FILTERED OBJECTS: ", filteredObjects);

      setFilteredAppData(filteredObjects);
    };

    filterAppData();
  }, [search, objects]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">{objects.length} Objects</span>
      <InputText
        placeholder="Search by name or key"
        type="text"
        className="w-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );

  const getRecords = (object: any) => {
    return appData?.recordCounts[object.key]?.toLocaleString() || 0;
  };

  return (
    <DataTable
      paginator
      rows={10}
      rowsPerPageOptions={[10, 25, 50]}
      value={filteredAppData}
      header={header}
      emptyMessage="No objects"
      selectionMode="single"
      sortMode="multiple"
      onRowSelect={(e) => {
        const objectKey = e.data.key;

        router.push(`/${appData?.id}/objects/${objectKey}`);
      }}>
      <Column field="name" header="Name" sortable></Column>
      <Column field="key" header="Key" sortable></Column>
      <Column field="fields.length" header="Fields" sortable></Column>
      <Column field="key" header="Records" body={getRecords} sortable></Column>
      <Column field="connections.inbound.length" header="Inbound Connections" sortable></Column>
      <Column field="connections.outbound.length" header="Outbound Connections" sortable></Column>
      <Column field="tasks.length" header="Tasks" sortable></Column>
    </DataTable>
  );
};

export default ObjectsTable;
