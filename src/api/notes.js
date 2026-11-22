import config from "@/config/config";
import api from "./api";

const uploadNote = async (data) => {
  return await api.post(`${config.apiUrl}/api/v1/notes/teacher/upload/`, data);
};

// * Used for resumitting the notes after rejection
const updateNote = async (id, data) => {
  return await api.patch(
    `${config.apiUrl}/api/v1/notes/teacher/${id}/update/`,
    data,
  );
};

const deleteNote = async (id) => {
  return await api.delete(`${config.apiUrl}/api/v1/notes/${id}/delete/`);
};

const getAllNotesByTeacher = async () => {
  return await api.get(`${config.apiUrl}/api/v1/notes/teacher/my-notes/`);
};

const getNoteById = async (id) => {
  return await api.get(`${config.apiUrl}/api/v1/notes/teacher/my-notes/${id}/`);
};

const getAllPublishedNotes = async () => {
  return await api.get(`${config.apiUrl}/api/v1/notes/`);
};

const getPublishedNotesDetails = async (id) => {
  return await api.get(`${config.apiUrl}/api/v1/notes/${id}`);
};

const getNotesByStatus = async (status) => {
  return await api.get(`${config.apiUrl}/api/v1/notes/status/${status}/`);
};

const giveRatingToPublishedNote = async (id, data) => {
  return await api.post(`${config.apiUrl}/api/v1/notes/${id}/rate/`, data);
};

// * Editor Review and Publish Note
const reviewAndPublishNote = async (id, data) => {
  return await api.patch(
    `${config.apiUrl}/api/v1/notes/editor/${id}/review`,
    data,
  );
};

export {
  uploadNote,
  updateNote,
  deleteNote,
  getAllNotesByTeacher,
  getNoteById,
  getAllPublishedNotes,
  getPublishedNotesDetails,
  getNotesByStatus,
  giveRatingToPublishedNote,
  reviewAndPublishNote,
};
