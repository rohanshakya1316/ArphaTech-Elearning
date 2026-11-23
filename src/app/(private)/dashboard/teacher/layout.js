import { TEACHER_ROLE } from "@/constants/roles";
import DashboardLayout from "../_components/DashboardLayout";

export const metadata = {
  title: "Teacher Dashboard",
  description: "Teacher Dashboard Page",
};

export default function TeacherLayout({ children }) {
  return <DashboardLayout role={TEACHER_ROLE}>{children}</DashboardLayout>;
}
