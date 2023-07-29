import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

const Objects = ({ appData }: { appData: any }) => {
  const [search, setSearch] = useState("");
  const [filteredAppData, setFilteredAppData] = useState(appData.application.objects);

  useEffect(() => {
    const filterAppData = () => {
      const filteredObjects = appData.application.objects.filter((object: any) => {
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
      <span className="text-xl text-900 font-bold">
        {appData.application.objects.length} Total Objects
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

  const getRecords = (object: any) => {
    return appData.application.counts[object.key].toLocaleString();
  };

  return (
    <DataTable
      value={filteredAppData}
      header={header}
      scrollable
      scrollHeight="750px"
      selectionMode="single"
      onRowSelect={(e) => {
        const objectKey = e.data.key;

        location.replace(`/${appData.application.id}/objects/${objectKey}`);
      }}>
      <Column field="name" header="Name"></Column>
      <Column field="key" header="Key"></Column>
      <Column field="fields.length" header="Fields"></Column>
      <Column field="key" header="Records" body={getRecords}></Column>
      <Column field="connections.inbound.length" header="Inbound Connections"></Column>
      <Column field="connections.outbound.length" header="Outbound Connections"></Column>
      <Column field="tasks.length" header="Tasks"></Column>
    </DataTable>
  );
};

export default Objects;