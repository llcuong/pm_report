import * as Tooltip from '@radix-ui/react-tooltip';
import PinholeHeader from "./pinholeReportHeader/PinholeHeader";
import PinholeBody from './pinholeReportBody/PinholeBody';
import { useContext } from 'react';
import PendingUI from './pinholeReportBody/PendingUI';
import { ZoomInButtonProvider } from './contexts/ZoomInButtonContext';
import { PinholeDataProvider } from './contexts/PinholeDataContext';

const MainPinholeReport = () => {
  return (
    <Tooltip.Provider delayDuration={300} skipDelayDuration={200}>
      <div className="p-4">
        <div className="relative">
          <PinholeDataProvider>
            <PendingUI />
            <ZoomInButtonProvider>
              <PinholeHeader />
              <PinholeBody />
            </ZoomInButtonProvider>
          </PinholeDataProvider>
        </div>
      </div>
    </Tooltip.Provider>
  );
};

export default MainPinholeReport;