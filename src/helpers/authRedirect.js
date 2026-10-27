import { STUDENT_ROLE, TEACHER_ROLE } from "@/constants/roles";
import {
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  REGISTER_STUDENT_ROUTE,
  REGISTER_TEACHER_ROUTE,
  STUDENT_DASHBOARD_ROUTE,
  TEACHER_DASHBOARD_ROUTE,
} from "@/constants/routes";
import { AUTH_STATES } from "@/stores/authStore";

export const getAuthRedirect = ({ authState, userRole, pathname }) => {
  const isGuest = authState === AUTH_STATES.GUEST;

  const isSignupPending = authState === AUTH_STATES.SIGNUP_PENDING;

  const isOTPVerified = authState === AUTH_STATES.OTP_VERIFIED;

  const isAuthenticated = authState === AUTH_STATES.AUTHENTICATED;
  console.log(isAuthenticated);

  const isPublicRoute = [HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, FORGOT_PASSWORD_ROUTE].includes(
    pathname,
  );

  const isOTPRoute = pathname === "/verify-otp";

  const isStudentRegister = pathname === REGISTER_STUDENT_ROUTE;

  const isTeacherRegister = pathname === REGISTER_TEACHER_ROUTE;

  const isRegistrationRoute = isStudentRegister || isTeacherRegister;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/courses");

  // Home page is accessible to everyone
  if (pathname === HOME_ROUTE) {
    return null;
  }

  // Guest users
  if (isGuest) {
    if (isPublicRoute) {
      return null;
    }

    return REGISTER_ROUTE;
  }

  // Signup is in progress
  if (isSignupPending) {
    if (isOTPRoute) {
      return null;
    }

    if (isPublicRoute) {
      return "/verify-otp";
    }

    return "/verify-otp";
  }

  // OTP verified, profile incomplete
  if (isOTPVerified) {
    const profileRoute =
      userRole === STUDENT_ROLE
        ? REGISTER_STUDENT_ROUTE
        : userRole === TEACHER_ROLE
          ? REGISTER_TEACHER_ROUTE
          : REGISTER_ROUTE;

    if (isRegistrationRoute) {
      if (isStudentRegister && userRole === STUDENT_ROLE) {
        return null;
      }

      if (isTeacherRegister && userRole === TEACHER_ROLE) {
        return null;
      }

      return profileRoute;
    }

    return profileRoute;
  }

  // Fully authenticated user
  if (isAuthenticated) {
    if (isPublicRoute || isOTPRoute || isRegistrationRoute) {
      if (userRole === STUDENT_ROLE) {
        return STUDENT_DASHBOARD_ROUTE;
      }

      if (userRole === TEACHER_ROLE) {
        return TEACHER_DASHBOARD_ROUTE;
      }
      return HOME_ROUTE;
    }

    if (isProtectedRoute) {
      return null;
    }

    return null;
  }

  return LOGIN_ROUTE;
};
