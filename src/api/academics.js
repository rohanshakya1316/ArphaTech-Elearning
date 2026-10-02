import config from "@/config/config";
import axios from "axios";

const getSubjectList = async () => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/subjects/`);
};

const getClassLevelList = async () => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/class-levels/`);
};

const getSchoolList = async () => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/schools/`);
};

const getSchoolDetails = async (id) => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/schools/${id}/`);
};

const getFacultyList = async () => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/faculties/`);
};

export { getSubjectList, getClassLevelList, getSchoolList, getSchoolDetails, getFacultyList };
