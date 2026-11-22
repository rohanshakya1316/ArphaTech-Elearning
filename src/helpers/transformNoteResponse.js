import { getFormattedDate } from "./getDateUtilities";

export const transformNote = (note) => {
  const formattedDate = getFormattedDate(note.created_at);
  return {
    id: note.id,
    title: note.title,
    fileName: note.pdf_url?.split("/").pop() || "",
    fileSize: note.file_size || "N/A",
    course: note.subject_name,
    className: note.class_level_name,
    author: note.author_name || "N/A",
    description: note.description,
    feedback: note.editor_feedback || "",
    createdAt: formattedDate,
    status: note.status_display,
  };
};
