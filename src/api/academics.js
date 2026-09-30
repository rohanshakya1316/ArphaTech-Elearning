import config from "@/config/config";
import axios from "axios";

const getSubjectList = async () => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/subjects/`);
};

const getSchoolList = async () => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/schools/`);
};

const getFacultyList = async () => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/faculties/`);
};

export { getSubjectList, getSchoolList, getFacultyList };
