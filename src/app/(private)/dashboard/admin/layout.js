import { ADMIN_ROLE } from "@/constants/roles";
import DashboardLayout from "../_components/DashboardLayout";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard Page",
};

const AdminDashboardLayout = ({ children }) => {
    return <DashboardLayout role={ADMIN_ROLE}>{children}</DashboardLayout>;
};

export default AdminDashboardLayout;
