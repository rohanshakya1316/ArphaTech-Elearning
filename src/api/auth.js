import config from "@/config/config";
import axios from "axios";
import api from "./api";
import { getCookie } from "@/helpers/cookie";

const sendOTP = async (data) => {
  return await axios.post(`${config.apiUrl}/api/v1/auth/signup/`, data);
};

const verifyOTP = async (data) => {
  return await axios.post(`${config.apiUrl}/api/v1/auth/otp/verify/`, data);
};

const resendOTPCode = async (data) => {
  return await axios.post(`${config.apiUrl}/api/v1/auth/otp/send/`, data);
};

const login = async (data) => {
  return await axios.post(`${config.apiUrl}/api/v1/auth/login/`, data);
};

const getAuthUserDetails = async () => {
  return await api.get(`${config.apiUrl}/api/v1/auth/me`);
};

const completeTeacherSignup = async (data) => {
  const token = getCookie("signUpToken");
  return await axios.post(
    `${config.apiUrl}/api/v1/auth/profile/teacher/complete/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

const completeStudentSignup = async (data) => {
  const token = getCookie("signUpToken");
  return await axios.post(
    `${config.apiUrl}/api/v1/auth/profile/student/complete/`,
    data,
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

const forgotPassword = async (data) => {
  return await axios.post(`${config.apiUrl}/api/v1/auth/password/reset/`, data);
};

// * Payload different for reset password but the endpoint is same as of forgotPassword
// ? This end point is used to reset password for authenticated users too.
const resetPassword = async (data) => {
  const resetPasswordToken = localStorage.getItem("resetPasswordToken");
  return await axios.post(
    `${config.apiUrl}/api/v1/auth/password/reset/`,
    data,
    {
      headers: { Authorization: `Bearer ${resetPasswordToken}` },
    },
  );
};

const confirmResetPassword = async (data) => {
  return await axios.post(
    `${config.apiUrl}/api/v1/auth/password/reset/confirm/`,
    data,
  );
};

const updateTeacherProfile = async (data) => {
  return await api.patch(
    `${config.apiUrl}/api/v1/auth/profile/teacher/update/`,
    data,
  );
};

const updateStudentProfile = async (data) => {
  return await api.patch(
    `${config.apiUrl}/api/v1/auth/profile/student/update/`,
    data,
  );
};

const logout = async (refreshToken) => {
  return await api.post(`${config.apiUrl}/api/v1/auth/logout/`, {
    refresh: refreshToken,
  });
};

// * Admin Only endpoints

// Get all users by admin only
const getAllUsersByAdmin = ({
  page,
  search = "",
  role = "",
  is_active = "",
  ordering = "",
} = {}) => {
  return api.get("/api/v1/auth/admin/users/", {
    params: {
      page,
      search: search || undefined,
      role: role || undefined,
      is_active: is_active || undefined,
      ordering: ordering || undefined,
    },
  });
};

// Update user role and activate/deactivate
const updateUserByAdmin = (phoneNumber, data) => {
  return api.patch(`/api/v1/auth/admin/users/${phoneNumber}/`, data);
};

// Create Editor by admin only
const createUserByAdmin = (data) => {
  return api.post("/api/v1/auth/admin/users/create/", data);
};

// Verify teacher documentation
const verifyTeacherByAdmin = (phoneNumber, data) => {
  return api.patch(`/api/v1/auth/admin/teachers/${phoneNumber}/verify/`, data);
};

export {
  sendOTP,
  verifyOTP,
  resendOTPCode,
  login,
  getAuthUserDetails,
  completeTeacherSignup,
  completeStudentSignup,
  forgotPassword,
  resetPassword,
  confirmResetPassword,
  updateStudentProfile,
  updateTeacherProfile,
  logout,
  getAllUsersByAdmin,
  updateUserByAdmin,
  createUserByAdmin,
  verifyTeacherByAdmin,
};

// * AUTH ENDPOINTS COMPLETED 17
