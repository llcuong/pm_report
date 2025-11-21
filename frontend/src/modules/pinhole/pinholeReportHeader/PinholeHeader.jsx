import PinholeDataOptions from "./PinholeDataOptions";
import PinholeTitle from "./PinholeTitle";

const PinholeHeader = () => {
  return (
    <div className="flex items-start gap-6 pb-4">
      <PinholeTitle />
      <PinholeDataOptions />
    </div>
  );
};

export default PinholeHeader;