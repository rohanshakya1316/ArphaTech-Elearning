import React from "react";

import { STUDENT_ROLE } from "@/constants/roles";
import DashboardLayout from "../_components/DashboardLayout";

const StudentDashboardLayout = ({ children }) => {
  return <DashboardLayout role={STUDENT_ROLE}>{children}</DashboardLayout>;
};

export default StudentDashboardLayout;
