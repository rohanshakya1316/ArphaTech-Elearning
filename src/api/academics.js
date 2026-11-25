import config from "@/config/config";
import axios from "axios";
import api from "./api";

const getAllChapters = async () => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/chapters/`);
};

const createChapter = async () => {
  return await api.post(`${config.apiUrl}/api/v1/academics/chapters/`);
};

const getChapterDetail = async (id) => {
  return await api.get(`${config.apiUrl}/api/v1/academics/chapters/${id}/`);
};

const updateChapter = async (id, data) => {
  return await api.patch(
    `${config.apiUrl}/api/v1/academics/chapters/${id}/`,
    data,
  );
};

const deleteChapter = async (id) => {
  return await api.delete(`${config.apiUrl}/api/v1/academics/chapters/${id}/`);
};

const getClassLevelList = async () => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/class-levels/`);
};

const createClassLevel = async () => {
  return await api.post(`${config.apiUrl}/api/v1/academics/class-levels/`);
};

const getClassLevelDetail = async (id) => {
  return await api.get(`${config.apiUrl}/api/v1/academics/class-levels/${id}/`);
};

const updateClassLevel = async (id, data) => {
  return await api.patch(
    `${config.apiUrl}/api/v1/academics/class-levels/${id}/`,
    data,
  );
};

const getFacultyList = async () => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/faculties/`);
};

const createFaculty = async () => {
  return await api.post(`${config.apiUrl}/api/v1/academics/faculties/`);
};

const getFacultyDetail = async (id) => {
  return await api.get(`${config.apiUrl}/api/v1/academics/faculties/${id}/`);
};

const updateFaculty = async (id, data) => {
  return await api.patch(
    `${config.apiUrl}/api/v1/academics/faculties/${id}/`,
    data,
  );
};

const getSchoolList = async () => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/schools/`);
};

const createSchool = async () => {
  return await api.post(`${config.apiUrl}/api/v1/academics/schools/`);
};

const getSchoolDetails = async (id) => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/schools/${id}/`);
};

const updateSchool = async (id, data) => {
  return await api.patch(
    `${config.apiUrl}/api/v1/academics/schools/${id}/`,
    data,
  );
};

const verifySchool = async (id) => {
  return await api.post(
    `${config.apiUrl}/api/v1/academics/schools/${id}/verify/`,
  );
};

const getMySchools = async () => {
  return await api.get(`${config.apiUrl}/api/v1/academics/schools/my_schools/`);
};

const getSubjectList = async () => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/subjects/`);
};

const createSubject = async () => {
  return await api.post(`${config.apiUrl}/api/v1/academics/subjects/`);
};

const getSubjectDetail = async (id) => {
  return await api.get(`${config.apiUrl}/api/v1/academics/subjects/${id}/`);
};

const updateSubject = async (id, data) => {
  return await api.patch(
    `${config.apiUrl}/api/v1/academics/subjects/${id}/`,
    data,
  );
};

const getTeacherSchoolAffiliations = async () => {
  return await api.get(`${config.apiUrl}/api/v1/academics/teacher-schools/`);
};

const getAllSchoolAffiliations = async () => {
  return await api.get(
    `${config.apiUrl}/api/v1/academics/teacher-schools/my_schools/`,
  );
};

export {
  getSubjectList,
  getClassLevelList,
  getSchoolList,
  getSchoolDetails,
  getFacultyList,
  getAllChapters,
  getAllSchoolAffiliations,
  getChapterDetail,
  getClassLevelDetail,
  getFacultyDetail,
  getMySchools,
  getSubjectDetail,
  getTeacherSchoolAffiliations,
  createChapter,
  createClassLevel,
  createFaculty,
  createSchool,
  createSubject,
  updateChapter,
  updateClassLevel,
  updateFaculty,
  updateSchool,
  updateSubject,
  deleteChapter,
  verifySchool,
};
