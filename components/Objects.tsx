import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { KnackAppData } from "./Store";

const Objects = ({ appData }: { appData: KnackAppData }) => {
  const [search, setSearch] = useState("");
  const [filteredAppData, setFilteredAppData] = useState(appData.objects);

  const router = useRouter();

  useEffect(() => {
    const filterAppData = () => {
      const filteredObjects = appData.objects.filter((object: any) => {
        return (
          object.name.toLowerCase().includes(search.trim().toLowerCase()) ||
          object.key.toLowerCase().includes(search.trim().toLowerCase())
        );
      });

      console.log("FILTERED OBJECTS: ", filteredObjects);

      setFilteredAppData(filteredObjects);
    };

    filterAppData();
  }, [search, appData]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">{appData.objectCount} Total Objects</span>
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
    return appData.recordCounts[object.key].toLocaleString();
  };

  return (
    <DataTable
      value={filteredAppData}
      header={header}
      emptyMessage="No objects"
      scrollable
      scrollHeight="750px"
      selectionMode="single"
      virtualScrollerOptions={{ itemSize: 46 }}
      sortMode="multiple"
      onRowSelect={(e) => {
        const objectKey = e.data.key;

        router.push(`/${appData.id}/objects/${objectKey}`);
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

export default Objects;
