"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Building2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import { getUserDetailByAdmin, verifyTeacherByAdmin } from "@/api/auth";
import DocumentPreview from "../../../_components/DocumentPreview";
import { VERIFY_TEACHER_ROUTE } from "@/constants/routes";

export default function TeacherVerificationPage() {
  const params = useParams();
  const router = useRouter();

  const phoneNumber = decodeURIComponent(params.phone_number);

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch teacher details
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        setLoading(true);

        const response = await getUserDetailByAdmin(phoneNumber);

        setTeacher(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to fetch teacher details.");
      } finally {
        setLoading(false);
      }
    };

    if (phoneNumber) {
      fetchTeacher();
    }
  }, [phoneNumber]);

  // Approve or reject
  const handleVerification = async (verified) => {
    const action = verified ? "approve" : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this teacher?`,
    );

    if (!confirmed) return;

    try {
      setSubmitting(true);

      await verifyTeacherByAdmin(phoneNumber, verified);

      toast.success(
        verified
          ? "Teacher verified successfully!"
          : "Teacher verification rejected.",
      );

      router.replace(VERIFY_TEACHER_ROUTE);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Failed to update teacher verification.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-87.5 items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={30} />
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="rounded-xl bg-card p-8 text-center">
        <p className="text-heading font-medium">
          Teacher information not found.
        </p>

        <button
          onClick={() => router.back()}
          className="mt-4 text-sm text-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  const details = [
    {
      label: "Full Name",
      value: teacher.full_name,
      icon: User,
    },
    {
      label: "Phone Number",
      value: teacher.phone_number,
      icon: Phone,
    },
    {
      label: "Email Address",
      value: teacher.email,
      icon: Mail,
    },

    {
      label: "Institution",
      value: teacher.profile?.school_names[0]?.name,
      icon: Building2,
    },
    {
      label: "Address",
      value: teacher.profile?.school_names[0]?.address,
      icon: MapPin,
    },
    {
      label: "Faculty",
      value: teacher.profile?.faculty_name,
      icon: GraduationCap,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            onClick={() => router.back()}
            className="mb-3 flex items-center gap-2 text-sm text-body hover:text-primary"
          >
            <ArrowLeft size={17} />
            Back to teachers
          </button>

          <h1 className="text-2xl font-bold text-heading">
            Teacher Verification Review
          </h1>

          <p className="mt-1 text-sm text-body">
            Review the submitted information before making a decision.
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium ${
            teacher?.is_verified_teacher
              ? "bg-green-50 text-green-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              teacher?.is_verified_teacher ? "bg-green-600" : "bg-amber-600"
            }`}
          />
          {teacher?.is_verified_teacher ? "Verified" : "Unverified"}
        </span>
      </div>

      {/* Teacher details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <section className="rounded-xl border border-slate-200 bg-card p-5">
          <h2 className="mb-5 text-lg font-semibold text-heading">
            Teacher Information
          </h2>

          <div className="space-y-5">
            {details.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="rounded-lg bg-background p-2">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">{item.label}</p>

                    <p className="mt-1 text-sm font-medium text-heading">
                      {item.value || "Not provided"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subjects */}
          <div className="mt-6 border-t border-slate-200 pt-5">
            <h3 className="mb-3 text-sm font-semibold text-heading">
              Teaching Subjects
            </h3>

            <div className="flex flex-wrap gap-2">
              {teacher.profile?.subjects?.length ? (
                teacher.profile?.subject_names.map((subject, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {typeof subject === "string" ? subject : subject.name}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted">No subjects provided.</p>
              )}
            </div>
          </div>
        </section>

        {/* Verification Document */}
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold text-heading">
              Verification Document
            </h2>

            <p className="text-sm text-body">
              Carefully inspect the uploaded document.
            </p>
          </div>

          <DocumentPreview fileUrl={teacher.profile?.verification_document} />
        </section>
      </div>

      {/* Verification Actions */}
      <section className="rounded-xl border border-slate-200 bg-card p-5">
        <h2 className="font-semibold text-heading">Verification Decision</h2>

        <p className="mt-1 text-sm text-body">
          Verify the teacher only after confirming that the submitted details
          and supporting document are legitimate.
        </p>

        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <button
            disabled={submitting || !teacher?.is_verified_teacher}
            onClick={() => handleVerification(false)}
            className="flex items-center gap-2 rounded-lg border border-red-200 px-5 py-2.5 text-sm font-medium text-error hover:bg-red-50 disabled:opacity-50"
          >
            <XCircle size={17} />
            Reject
          </button>

          <button
            disabled={submitting || teacher?.is_verified_teacher}
            onClick={() => handleVerification(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <CheckCircle size={17} />
            )}
            Approve Teacher
          </button>
        </div>
      </section>
    </div>
  );
}
