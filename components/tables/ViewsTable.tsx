import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Store";
import { AppDataContext } from "@/types";

const ViewsTable = ({ views }: { views: any[] }) => {
  const [search, setSearch] = useState("");
  const [filteredAppData, setFilteredAppData] = useState(views);

  const { appData } = useContext(AppContext) as AppDataContext;

  const router = useRouter();

  useEffect(() => {
    const filterAppData = () => {
      const filtered = views.filter((view: any) => {
        return (
          view.name.toLowerCase().includes(search.trim().toLowerCase()) ||
          view.key.toLowerCase().includes(search.trim().toLowerCase())
        );
      });

      console.log("FILTERED views: ", filtered);

      setFilteredAppData(filtered);
    };

    filterAppData();
  }, [search, views]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">{views.length} Views</span>
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
      emptyMessage="No views"
      selectionMode="single"
      sortMode="multiple"
      onRowSelect={(e) => {
        const viewKey = e.data.key;

        router.push(`/${appData?.id}/views/${viewKey}`);
      }}>
      <Column field="name" header="Name" sortable></Column>
      <Column field="key" header="Key" sortable></Column>
      <Column field="type" header="Type" sortable></Column>
      <Column field="action" header="Action" sortable></Column>
      <Column
        header="# of Child Views"
        body={(rowData: any) => {
          return rowData.child_views?.length || 0;
        }}></Column>
    </DataTable>
  );
};

export default ViewsTable;
