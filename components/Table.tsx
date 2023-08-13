import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { KnackAppData } from "./Store";
import { InputText } from "primereact/inputtext";

interface TableProps {
  headerTitle?: JSX.Element;
  emptyMessage: string;
  appData: KnackAppData;
  countRecords?: (object: any) => string;
}

const Table = ({ headerTitle, emptyMessage, appData, countRecords }: TableProps) => {
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
      {headerTitle ? headerTitle : <div></div>}

      <InputText
        placeholder="Search by name or key"
        type="text"
        className="w-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
  3;

  return (
    <DataTable
      value={filteredAppData}
      header={header}
      emptyMessage={emptyMessage}
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
      <Column field="key" header="Records" body={countRecords} sortable></Column>
      <Column field="connections.inbound.length" header="Inbound Connections" sortable></Column>
      <Column field="connections.outbound.length" header="Outbound Connections" sortable></Column>
      <Column field="tasks.length" header="Tasks" sortable></Column>
    </DataTable>
  );
};

export default Table;
