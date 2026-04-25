import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../features/admin/Dashboard";
import Visits from "../features/admin/Visits";

export default function Admin() {
  return (
    <AdminLayout>
      <Dashboard />
      <Visits />
    </AdminLayout>
  );
}