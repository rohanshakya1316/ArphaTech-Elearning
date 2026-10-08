import config from "@/config/config";
import axios from "axios";
import api from "./api";

const sendOTP = async (data) => {
  return await axios.post(`${config.apiUrl}/api/v1/auth/signup/`, data);
};

const verifyOTP = async (data) => {
  const signUpToken = localStorage.getItem("signUpToken");
  return await axios.post(`${config.apiUrl}/api/v1/auth/otp/verify/`, data, {
    headers: signUpToken ? { Authorization: `Bearer ${signUpToken}` } : {},
  });
};

const resendOTPCode = async (data) => {
  const signUpToken = localStorage.getItem("signUpToken");
  return await axios.post(`${config.apiUrl}/api/v1/auth/otp/send/`, data, {
    headers: { Authorization: `Bearer ${signUpToken}` },
  });
};

const login = async (data) => {
  return await axios.post(`${config.apiUrl}/api/v1/auth/login/`, data);
};

const completeTeacherSignup = async (data) => {
  return await api.post(
    `${config.apiUrl}/api/v1/auth/profile/teacher/complete/`,
    data,
  );
};

const completeStudentSignup = async (data) => {
  return await api.post(
    `${config.apiUrl}/api/v1/auth/profile/student/complete/`,
    data,
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
  return await axios.post(`${config.apiUrl}/api/v1/auth/password/reset/confirm/`, data)  
}

const logout = async (refreshToken) => {
  return await axios.post(`${config.apiUrl}/api/v1/auth/logout/`, refreshToken);
};
export {
  sendOTP,
  verifyOTP,
  resendOTPCode,
  login,
  completeTeacherSignup,
  completeStudentSignup,
  forgotPassword,
  resetPassword,
  confirmResetPassword,
  logout,
};
