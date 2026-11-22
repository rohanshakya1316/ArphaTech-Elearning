"use client";

import { getNoteById, updateNote } from "@/api/notes";
import UploadNoteForm from "@/components/UploadNoteForm";
import { useInitialData } from "@/hooks/useInitialData";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditNotePage = () => {
  const { subjects, classLevels } = useInitialData();

  const { noteId } = useParams();
  const router = useRouter();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing note details
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);

        const response = await getNoteById(noteId);

        setNote(response.data);
      } catch (error) {
        console.error("Fetch note error:", error);

        toast.error(
          error.response?.data?.detail || "Failed to fetch note details.",
        );

        router.back();
      } finally {
        setLoading(false);
      }
    };

    if (noteId) {
      fetchNote();
    }
  }, [noteId, router]);

  // Update note
  const handleEditNote = async (formData) => {
    try {
      const response = await updateNote(noteId, formData);

      toast.success(response.data?.message || "Note updated successfully.");

      return true;
    } catch (error) {
      console.error("Update note error:", error);

      toast.error(error.response?.data?.detail || "Note update failed.");

      return false;
    }
  };

  if (loading) {
    return <div>Loading note details...</div>;
  }

  if (!note) {
    return null;
  }

  return (
    <UploadNoteForm
      note={note}
      onSubmit={handleEditNote}
      onCancel={() => router.back()}
      classLevels={classLevels}
      subjects={subjects}
      isEditing={true}
    />
  );
};

export default EditNotePage;
