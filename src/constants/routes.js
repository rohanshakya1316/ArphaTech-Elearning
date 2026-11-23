export const HOME_ROUTE = "/";

// * Auth Management Routes
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/signup";
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const RESET_PASSWORD_ROUTE = "/reset-password";
export const REGISTER_TEACHER_ROUTE = `${REGISTER_ROUTE}/complete-teacher`;
export const REGISTER_STUDENT_ROUTE = `${REGISTER_ROUTE}/complete-student`;

// * Dashboard Management Routes
export const PROFILE_ROUTE = "/profile";
export const DASHBOARD_ROUTE = "/dashboard"
export const STUDENT_DASHBOARD_ROUTE = `${DASHBOARD_ROUTE}/student`;
export const TEACHER_DASHBOARD_ROUTE = `${DASHBOARD_ROUTE}/teacher`;
export const ADMIN_DASHBOARD_ROUTE = `${DASHBOARD_ROUTE}/admin`;

// * Notes Management Routes for Teachers
export const TEACHER_NOTE_ROUTE = `${TEACHER_DASHBOARD_ROUTE}/notes`
export const TEACHER_NOTE_UPLOAD_ROUTE = `${TEACHER_NOTE_ROUTE}/upload`

// * Admin Routes
export const USER_MANAGEMENT_ROUTE = `${ADMIN_DASHBOARD_ROUTE}/user-management`