import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { KnackAppData } from "./Store";
import CheckOrX from "./CheckOrX";

const Fields = ({ appData }: { appData: KnackAppData }) => {
  const [search, setSearch] = useState("");
  const [filteredAppData, setFilteredAppData] = useState(appData.fields);

  const router = useRouter();

  useEffect(() => {
    const filterAppData = () => {
      const filteredFields = appData.fields.filter((field: any) => {
        return (
          field.name.toLowerCase().includes(search.trim().toLowerCase()) ||
          field.key.toLowerCase().includes(search.trim().toLowerCase())
        );
      });

      console.log("FILTERED fields: ", filteredFields);

      setFilteredAppData(filteredFields);
    };

    filterAppData();
  }, [search, appData]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">{appData.fields.length} Total Fields</span>
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
      emptyMessage="No fields"
      selectionMode="single"
      sortMode="multiple"
      onRowSelect={(e) => {
        const fieldKey = e.data.key;

        router.push(`/${appData.id}/fields/${fieldKey}`);
      }}>
      <Column field="name" header="Name" sortable></Column>
      <Column field="key" header="Key" sortable></Column>
      <Column field="object_key" header="Object" sortable></Column>
      <Column field="type" header="Type" sortable></Column>
      <Column
        field="required"
        header="Required"
        sortable
        style={{ textAlign: "center" }}
        body={(data: any) => <CheckOrX value={data.required} />}></Column>
      <Column
        field="unique"
        header="Unique"
        sortable
        style={{ textAlign: "center" }}
        body={(data: any) => <CheckOrX value={data.unique} />}></Column>
      <Column
        field="validation"
        header="Validation"
        sortable
        style={{ textAlign: "center" }}
        body={(data: any) => <CheckOrX value={data.validation} />}></Column>
    </DataTable>
  );
};

export default Fields;
