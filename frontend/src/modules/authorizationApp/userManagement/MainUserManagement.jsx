import DataTable from "./dataTable/DataTable";
import UserManagementHeader from "./header/UserManangementHeader";
import Paging from "./paging/Paging";

const MainUserManagement = () => {
  return (
    <div className="mt-5 h-220 mx-auto flex md:flex-col gap-10 bg-white shadow-md p-6 rounded-xl">
      <UserManagementHeader />

      <DataTable />

      <Paging />
    </div>
  );
};

export default MainUserManagement;