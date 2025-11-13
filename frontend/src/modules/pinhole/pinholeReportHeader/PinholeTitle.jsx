import usePinholeDataContext from "../contexts/usePinholeDataContext";
import { useTranslation } from "react-i18next";

const PinholeTitle = () => {
  const { viewData, isAPIError } = usePinholeDataContext();

  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col">
      <h1 className={`text-2xl font-bold text-[#024A54]`}>
        {t('outlet.pinholeReport.header.pinholeTitle')}

        {viewData?.title && (
          <>
            <span>{' '}{'\u2013'}</span>
            <span className={`inline-block ml-2 align-baseline 
                              ${isAPIError ? 'text-red-600' : 'text-[#024A54]'}`}>
              {t(`${viewData.title}`)}
            </span>
          </>
        )}
      </h1>
    </div>
  );
};

export default PinholeTitle;