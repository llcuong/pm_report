import MainIPQCTable from "./components/dataTable/MainIPQCTable";
import IPQCHeader from "./components/header/IPQCHeader";
import { IPQCSelectOptionProvider } from "./contexts/IPQCSelectOptionContext";

const MainIPQCData = () => {
  return (
    <div className="mt-5 h-220 mx-auto flex md:flex-col gap-10 bg-white shadow-md p-6 rounded-xl">
      <IPQCSelectOptionProvider>
        <IPQCHeader />
        <MainIPQCTable />
      </IPQCSelectOptionProvider>
    </div>
  );
};

export default MainIPQCData;