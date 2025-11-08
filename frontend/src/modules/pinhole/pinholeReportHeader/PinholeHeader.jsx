import { PinholeSelectOptionProvider } from "../contexts/PinholeSelectOptionContext";
import PinholeDataOptions from "./PinholeDataOptions";
import PinholeTitle from "./PinholeTitle";

const PinholeHeader = () => {
  return (
    <PinholeSelectOptionProvider>
      <div className="flex items-start gap-6 pb-4">
        <PinholeTitle />
        <PinholeDataOptions />
      </div>
    </PinholeSelectOptionProvider>
  );
};

export default PinholeHeader;