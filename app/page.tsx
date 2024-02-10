import AppSearch from "@/components/AppSearch";
import PastSearches from "@/components/PastSearches";

const Home = () => {
  return (
    <div className="flex flex-col justify-center h-screen">
      <div>
        <h2 className="text-center">Welcome to KnackLens</h2>
        <p className="text-center mb-8">Use this tool to view metadata for any Knack application</p>
        <AppSearch />
      </div>

      <PastSearches />
    </div>
  );
};

export default Home;
