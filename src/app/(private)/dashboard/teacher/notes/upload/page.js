"use client";

import { uploadNote } from "@/api/notes";
import UploadNoteForm from "@/components/UploadNoteForm";
import { useInitialData } from "@/hooks/useInitialData";
import { toast } from "react-toastify";

const UploadNotePage = () => {
  const { subjects, classLevels } = useInitialData();

  const handleUploadNote = async (formData) => {
    try {
      const response = await uploadNote(formData);

      toast.success(response.data?.message || "Notes uploaded successfully.");

      return true;
    } catch (error) {
      console.error("Upload error:", error);

      toast.error(error.response?.data?.detail || "Notes Upload Failed");

      return false;
    }
  };

  return (
    <UploadNoteForm 
      onSubmit={handleUploadNote}
      onCancel={() => window.history.back()}
      classLevels={classLevels}
      subjects={subjects}
    />
  );
};

export default UploadNotePage;
