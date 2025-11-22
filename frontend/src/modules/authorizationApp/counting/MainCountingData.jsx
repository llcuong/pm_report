import { CountingSelectOptionProvider } from "./components/contexts/CountingSelectOptionContext";
import CountingHeader from "./components/header/CountingHeader";

const MainCountingData = () => {
  return (
    <div className="mt-5 h-220 mx-auto flex md:flex-col gap-10 bg-white shadow-md p-6 rounded-xl">
      <CountingSelectOptionProvider>
        <CountingHeader />
      </CountingSelectOptionProvider>
    </div>
  );
};

export default MainCountingData;