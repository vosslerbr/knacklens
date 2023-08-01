import { ProgressBar } from "primereact/progressbar";

const PageLoading = () => {
  return (
    <div className="card">
      <h2 id="app-name">Loading app data...</h2>
      <ProgressBar mode="indeterminate" style={{ height: "6px" }}></ProgressBar>
    </div>
  );
};

export default PageLoading;
