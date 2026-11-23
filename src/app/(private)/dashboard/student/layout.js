import { STUDENT_ROLE } from "@/constants/roles";
import DashboardLayout from "../_components/DashboardLayout";

export const metadata = {
  title: "Student Dashboard",
  description: "Student Dashboard Page" 
}

const StudentDashboardLayout = ({ children }) => {
  return <DashboardLayout role={STUDENT_ROLE}>{children}</DashboardLayout>;
};

export default StudentDashboardLayout;
