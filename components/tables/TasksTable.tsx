import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useContext, useEffect, useState } from "react";
import { AppContext, AppDataContext } from "../Store";
import CheckOrX from "../CheckOrX";

const TasksTable = ({ tasks }: { tasks: any[] }) => {
  const [search, setSearch] = useState("");
  const [filteredAppData, setFilteredAppData] = useState(tasks);

  const { appData } = useContext(AppContext) as AppDataContext;

  const router = useRouter();

  useEffect(() => {
    const filterAppData = () => {
      const filteredTasks = tasks.filter((task: any) => {
        return (
          task.name.toLowerCase().includes(search.trim().toLowerCase()) ||
          task.key.toLowerCase().includes(search.trim().toLowerCase())
        );
      });

      console.log("FILTERED tasks: ", filteredTasks);

      setFilteredAppData(filteredTasks);
    };

    filterAppData();
  }, [search, tasks]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">{tasks.length} Tasks</span>
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
      emptyMessage="No tasks"
      selectionMode="single"
      sortMode="multiple"
      onRowSelect={(e) => {
        const taskKey = e.data.key;

        router.push(`/${appData?.id}/tasks/${taskKey}`);
      }}>
      <Column field="name" header="Name" sortable></Column>
      <Column field="key" header="Key" sortable></Column>
      <Column field="object_key" header="Object" sortable></Column>
      <Column field="schedule.time" header="Time" sortable></Column>
      <Column field="schedule.repeat" header="Repeats" sortable></Column>
      <Column
        field="scheduled"
        header="Scheduled"
        sortable
        style={{ textAlign: "center" }}
        body={(data: any) => <CheckOrX value={data.scheduled} />}></Column>
      <Column
        field="run_status"
        header="Running"
        sortable
        style={{ textAlign: "center" }}
        body={(data: any) => <CheckOrX value={data.run_status} />}></Column>
    </DataTable>
  );
};

export default TasksTable;
