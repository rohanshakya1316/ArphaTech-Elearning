import config from "@/config/config";
import axios from "axios";
import api from "./api";

const sendOTP = async (data) => {
  return await axios.post(`${config.apiUrl}/api/v1/auth/signup/`, data);
};

const verifyOTP = async (data) => {
  const signUpToken = localStorage.getItem("signUpToken");
  return await axios.post(`${config.apiUrl}/api/v1/auth/otp/verify/`, data, {
    headers: { Authorization: `Bearer ${signUpToken}` },
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

export {
  sendOTP,
  verifyOTP,
  resendOTPCode,
  login,
  completeTeacherSignup,
  completeStudentSignup,
};
