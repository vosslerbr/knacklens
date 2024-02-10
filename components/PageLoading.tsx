import { Loader2 } from "lucide-react";

const PageLoading = () => {
  return (
    <div>
      <h2>Loading app data...</h2>
      <Loader2 className="w-12 h-12 text-slate-500 mx-auto animate-spin" />
    </div>
  );
};

export default PageLoading;
