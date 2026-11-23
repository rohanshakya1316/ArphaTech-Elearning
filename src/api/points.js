import config from "@/config/config";
import api from "./api";

const getTeacherPoints = async () => {
  return await api.get(`${config.apiUrl}/api/v1/points/teacher/dashboard/`);
};

export default getTeacherPoints;
