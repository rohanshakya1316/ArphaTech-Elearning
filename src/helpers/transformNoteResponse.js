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
    author: note.uploaded_by_name || "N/A",
    description: note.description,
    feedback: note.editor_feedback || "",
    createdAt: formattedDate,
    status: note.status_display,
  };
};

// ! API RESPONSE FOR GET NOTES 
// {
//         "id": 3,
//         "title": "ftgyjikp",
//         "description": "yguyjoiklughinj",
//         "pdf_url": "http://localhost:8000/media/notes/pdfs/2026/11/20/ai_front.pdf",
//         "subject_name": "Computer",
//         "class_level_name": "Grade 12",
//         "status": "pending",
//         "status_display": "Pending Editor Review",
//         "uploaded_by_name": "Makhhan Chand Pandey",
//         "content": null,
//         "editor_feedback": "",
//         "average_rating": "0.00",
//         "total_reviews": 0,
//         "reviewed_at": null,
//         "created_at": "2026-11-20T13:45:52.578699+05:45"
//     },