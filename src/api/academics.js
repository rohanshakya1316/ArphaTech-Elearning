import config from "@/config/config";
import axios from "axios";
import api from "./api";

// * Chapters Endpoints
const getAllChapters = async ({
  page = 1,
  search = "",
  is_active = "",
  subject = "",
} = {}) => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/chapters/`, {
    params: {
      page: page,
      search: search || undefined,
      is_active: is_active || undefined,
      subject: subject || undefined,
    },
  });
};

const createChapter = async (data) => {
  return await api.post(`${config.apiUrl}/api/v1/academics/chapters/`, data);
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

// * Class Level Endpoints
const getClassLevelList = async ({
  page = 1,
  search = "",
  levelType = "",
} = {}) => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/class-levels/`, {
    params: {
      page: page,
      search: search || undefined,
      level_type: levelType || undefined,
    },
  });
};

const createClassLevel = async (data) => {
  return await api.post(
    `${config.apiUrl}/api/v1/academics/class-levels/`,
    data,
  );
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

// * Faculty Endpoints
const getFacultyList = async ({ page = 1, search = "" } = {}) => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/faculties/`, {
    params: {
      page: page,
      search: search || undefined,
    },
  });
};

const createFaculty = async (data) => {
  return await api.post(`${config.apiUrl}/api/v1/academics/faculties/`, data);
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

// * School Endpoints
const getSchoolList = async () => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/schools/`);
};

const createSchool = async (data) => {
  return await api.post(`${config.apiUrl}/api/v1/academics/schools/`, data);
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

// * Subject Endpoints
const getSubjectList = async ({
  page,
  search = "",
  class_level = "",
  is_active = "",
  faculty = "",
} = {}) => {
  return await axios.get(`${config.apiUrl}/api/v1/academics/subjects/`, {
    params: {
      page,
      search: search || undefined,
      class_level: class_level || undefined,
      is_active: is_active || undefined,
      faculty: faculty || undefined,
    },
  });
};

const createSubject = async (data) => {
  return await api.post(`${config.apiUrl}/api/v1/academics/subjects/`, data);
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

// * Teacher School Affiliations Endpoints
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
