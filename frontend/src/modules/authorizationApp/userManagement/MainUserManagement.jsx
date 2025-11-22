import { UserManagementProvider } from "./contexts/UserManagementContext";
import DataTable from "./components/dataTable/DataTable";
import UserManagementHeader from "./components/header/UserManangementHeader";
import Paging from "./components/paging/Paging";

const MainUserManagement = () => {
  return (
    <div className="mt-5 h-220 mx-auto flex md:flex-col gap-10 bg-white shadow-md p-6 rounded-xl">
      <UserManagementProvider>
        <UserManagementHeader />
        <DataTable />
        {/* <Paging /> */}
      </UserManagementProvider>
    </div>
  );
};

export default MainUserManagement;