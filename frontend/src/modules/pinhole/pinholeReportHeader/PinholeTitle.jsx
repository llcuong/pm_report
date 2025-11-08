import { PM_GROUP_MAIN_COLOR } from "@constants/Color";
import usePinholeDataContext from "../contexts/usePinholeDataContext";

const PinholeTitle = () => {
  const { viewData, isAPIError } = usePinholeDataContext();
  return (
    <div className="flex-1 flex flex-col">
      <h1 className={`text-2xl font-bold text-[${PM_GROUP_MAIN_COLOR}]`}>
        Pinhole Inspection Data

        {viewData?.title && (
          <>
            <span>{' '}{'\u2013'}</span>
            <span className={`inline-block ml-2 align-baseline 
                              ${isAPIError ? 'text-red-600' : `text-[${PM_GROUP_MAIN_COLOR}]`}`}>
              {viewData.title}
            </span>
          </>
        )}
      </h1>
    </div>
  );
};

export default PinholeTitle;