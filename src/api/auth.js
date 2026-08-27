import config from "@/config/config";
import axios from "axios";

const sendOTP = async (data) => {
  return await axios.post(`${config.apiUrl}/api/v1/auth/signup/`, data);
};

const login = async (data) => {
  return await axios.post(`${config.apiUrl}/api/v1/auth/login/`, data);
};

export { sendOTP, login };
