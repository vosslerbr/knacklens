import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { KnackAppData } from "./Store";

const Tasks = ({ appData }: { appData: KnackAppData }) => {
  const [search, setSearch] = useState("");
  const [filteredAppData, setFilteredAppData] = useState(appData.tasks);

  const router = useRouter();

  useEffect(() => {
    const filterAppData = () => {
      const filteredTasks = appData.tasks.filter((task: any) => {
        return (
          task.name.toLowerCase().includes(search.trim().toLowerCase()) ||
          task.key.toLowerCase().includes(search.trim().toLowerCase())
        );
      });

      console.log("FILTERED tasks: ", filteredTasks);

      setFilteredAppData(filteredTasks);
    };

    filterAppData();
  }, [search, appData]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">{appData.tasks.length} Total Tasks</span>
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
      scrollable
      scrollHeight="750px"
      selectionMode="single"
      onRowSelect={(e) => {
        const taskKey = e.data.key;

        router.push(`/${appData.id}/tasks/${taskKey}`);
      }}>
      <Column field="name" header="Name"></Column>
      <Column field="key" header="Key"></Column>
      <Column field="object_key" header="Object"></Column>
      <Column field="scheduled" header="Scheduled"></Column>
      <Column field="run_status" header="Running"></Column>
      <Column field="schedule.time" header="Time"></Column>
      <Column field="schedule.repeat" header="Repeats"></Column>
    </DataTable>
  );
};

export default Tasks;
