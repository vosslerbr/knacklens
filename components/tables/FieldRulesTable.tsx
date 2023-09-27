import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable, DataTableExpandedRows, DataTableValueArray } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Store";
import CheckOrX from "../CheckOrX";
import { AppDataContext } from "@/types";

const FieldRulesTable = ({ fieldRules }: { fieldRules: any[] }) => {
  const [search, setSearch] = useState("");
  const [filteredFieldRules, setFilteredFieldRules] = useState(fieldRules);
  const { appData } = useContext(AppContext) as AppDataContext;

  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);

  const router = useRouter();

  useEffect(() => {
    const searchLower = search.trim().toLowerCase();

    // const filterAppData = () => {
    //   const filtered = fieldRules.filter((rule: any) => {
    //     return (
    //       rule.name.toLowerCase().includes(searchLower) ||
    //       rule.key.toLowerCase().includes(searchLower)
    //     );
    //   });

    //   console.log("FILTERED fields: ", filtered);

    //   setFilteredFieldRules(filtered);
    // };

    // filterAppData();
  }, [search, fieldRules]);

  const rowExpansionTemplate = (data: any) => {
    console.log("data: ", data);

    return (
      <div className="p-3">
        <h5>Criteria</h5>
        <DataTable value={data.criteria}>
          <Column field="field" header="Field" sortable></Column>
          <Column field="operator" header="Operator" sortable></Column>
          <Column field="value" header="Value" sortable></Column>
          <Column field="value_type" header="Value Type" sortable></Column>
          <Column field="value_field" header="Value Field" sortable></Column>
        </DataTable>
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">{fieldRules.length} Field Rules</span>
      <InputText
        placeholder="Search by name or key"
        type="text"
        className="w-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );

  const allowExpansion = (rowData: any) => {
    return rowData.criteria.length > 0;
  };

  // TODO
  return (
    <DataTable
      paginator
      rows={10}
      rowsPerPageOptions={[10, 25, 50]}
      className="mb-6 mt-6"
      value={fieldRules}
      header={header}
      emptyMessage="No field rules"
      selectionMode="single"
      expandedRows={expandedRows}
      onRowToggle={(e) => setExpandedRows(e.data)}
      rowExpansionTemplate={rowExpansionTemplate}
      onRowSelect={(e) => {
        const objectKey = e.data.object;

        console.log("objectKey: ", objectKey);
      }}>
      <Column expander={allowExpansion} style={{ width: "5rem" }} />
      <Column field="values[0]" header="Set Field" sortable></Column>
    </DataTable>
  );
};

export default FieldRulesTable;
