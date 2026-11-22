"use client";

import { getAllNotesByTeacher } from "@/api/notes";
import { TEACHER_NOTE_UPLOAD_ROUTE } from "@/constants/routes";
import { transformNote } from "@/helpers/transformNoteResponse";
import {
  CalendarDays,
  CheckCircle2,
  File,
  FileText,
  GraduationCap,
  LayoutGrid,
  List,
  MessageSquareText,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// Temporary data: replace with API response later.
const initialNotes = [
  {
    id: 1,
    title: "Introduction to Computer Networks",
    fileName: "Computer_Networks_Notes.pdf",
    fileSize: "2.4 MB",
    course: "Computer Networks",
    className: "Class 12",
    author: "John Doe",
    description:
      "A comprehensive collection of computer network notes covering network fundamentals, types of networks, OSI and TCP/IP models, network topologies, protocols, and communication methods. Suitable for students preparing for examinations.",
    feedback:
      "The notes are well-organized and cover the required topics. A few diagrams could be improved for better understanding. Overall, good work!",
    createdAt: "2026-11-18T10:30:00",
    status: "Approved",
  },
];

function NoteCard({ note, view, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md ${
        view === "list" ? "flex flex-col" : ""
      }`}
    >
      {/* File information */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-red-50">
          <div className="flex flex-col items-center text-red-600">
            <FileText size={38} strokeWidth={1.7} />
            <span className="text-[10px] font-bold">PDF</span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h2 className="text-base font-bold leading-6 text-slate-900">
              {note.title}
            </h2>

            <span
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                note.status === "Approved"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              <CheckCircle2 size={14} />
              {note.status}
            </span>
          </div>

          <p className="mt-1 break-all text-sm font-medium text-slate-800">
            {note.fileName}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>PDF Document</span>
            <span>•</span>
            <span>{note.fileSize}</span>
          </div>

          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <GraduationCap size={16} />
              {note.className}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-5">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
          <FileText size={17} className="text-slate-500" />
          Description
        </h3>

        <p className="text-sm leading-6 text-slate-600">
          {expanded
            ? note.description
            : `${note.description.slice(0, 155)}${
                note.description.length > 155 ? "..." : ""
              }`}
          {note.description.length > 155 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-1 font-semibold text-primary hover:underline"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </p>
      </div>

      {/* Editor feedback */}
      <div className="mt-4 rounded-xl bg-indigo-50/80 p-3">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <MessageSquareText size={18} className="text-blue-600" />
          Editor&apos;s Feedback
        </h3>

        <p className="mt-2 pl-7 text-sm leading-5 text-slate-600">
          {note.feedback || "No feedback provided yet."}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col gap-4 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CalendarDays size={17} />
            <div>
              <span className="block">Created At</span>
              <span className="font-medium text-slate-800">
                {note.createdAt}
              </span>
            </div>
          </div>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-2">
            <UserRound size={17} />
            <span>
              By:{" "}
              <span className="font-medium text-slate-800">{note.author}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <Link
            href={`/dashboard/notes/${note.id}/edit`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 sm:flex-none"
          >
            <Pencil size={16} />
            Edit
          </Link>

          <button
            onClick={() => onDelete(note)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:flex-none"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [view, setView] = useState("grid");
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNotesByTeacher()
      .then((response) => {
        setNotes(response.data);
        const formattedNotes = response.data.map(transformNote);
        console.log(formattedNotes);
      })
      .catch((error) => console.log(error.response?.data))
      .finally(() => setLoading(false));
  }, []);

  const courses = [...new Set(notes.map((note) => note.course))];
  const authors = [...new Set(notes.map((note) => note.author))];

  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        const matchesSearch =
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.fileName.toLowerCase().includes(search.toLowerCase());

        const matchesCourse =
          courseFilter === "all" || note.course === courseFilter;

        const matchesAuthor =
          authorFilter === "all" || note.author === authorFilter;

        return matchesSearch && matchesCourse && matchesAuthor;
      })
      .sort((a, b) => {
        return sortOrder === "newest"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      });
  }, [notes, search, courseFilter, authorFilter, sortOrder]);

  const handleDelete = () => {
    setNotes((previous) =>
      previous.filter((note) => note.id !== selectedNote.id),
    );
    setSelectedNote(null);
  };

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Page heading */}
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <FileText size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-heading sm:text-3xl">
                Course Notes
              </h1>
              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Access and manage notes shared by your teachers and admin.
              </p>
            </div>
          </div>

          <Link
            href={TEACHER_NOTE_UPLOAD_ROUTE}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-primary-hover sm:w-auto"
          >
            <Plus size={21} />
            Add Note
          </Link>
        </div>

        {/* Search and filters */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_180px_180px_180px_auto]">
            {/* Search */}
            <div className="relative">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes by title, course..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Course filter */}
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-primary"
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            {/* Author filter */}
            <select
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-primary"
            >
              <option value="all">All Authors</option>
              {authors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>

            {/* Sorting */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-primary"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            {/* View toggle */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 p-1">
              <button
                onClick={() => setView("grid")}
                aria-label="Grid view"
                className={`flex flex-1 items-center justify-center rounded-lg p-2.5 transition sm:flex-none ${
                  view === "grid"
                    ? "bg-primary text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <LayoutGrid size={19} />
              </button>

              <button
                onClick={() => setView("list")}
                aria-label="List view"
                className={`flex flex-1 items-center justify-center rounded-lg p-2.5 transition sm:flex-none ${
                  view === "list"
                    ? "bg-primary text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <List size={19} />
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredNotes.length}
            </span>{" "}
            notes
          </p>
        </div>

        {/* Notes grid */}
        {filteredNotes.length > 0 ? (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 gap-5 xl:grid-cols-2"
                : "flex flex-col gap-4"
            }
          >
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                view={view}
                onDelete={setSelectedNote}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <File size={40} className="mx-auto text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              No notes found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Delete Note</h2>
              <button
                onClick={() => setSelectedNote(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-900">
                {selectedNote.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedNote(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
