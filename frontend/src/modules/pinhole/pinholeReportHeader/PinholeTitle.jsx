import usePinholeDataContext from "../contexts/usePinholeDataContext";

const PinholeTitle = () => {
  const { viewData, isAPIError } = usePinholeDataContext();
  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-2xl font-bold text-[#008B8C]">
        Pinhole Inspection Data

        {viewData?.title && (
          <>
            <span>{' '}{'\u2013'}</span>
            <span className={`inline-block ml-2 align-baseline 
                              ${isAPIError ? 'text-red-600' : 'text-[#008B8C]'}`}>
              {viewData.title}
            </span>
          </>
        )}
      </h1>
    </div>
  );
};

export default PinholeTitle;