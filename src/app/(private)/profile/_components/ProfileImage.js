"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import placeholder from "@/assets/images/placeholder.png";

import { STUDENT_ROLE, TEACHER_ROLE } from "@/constants/roles";
import { getImageUrl } from "@/helpers/getImage";
import { useAuthStore } from "@/stores/authStore";

import {
  Camera,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShieldX,
  Upload,
} from "lucide-react";

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ACCEPTED_IMAGE_TYPES = ALLOWED_IMAGE_TYPES.join(",");

const ProfileImage = ({ onImageSelect }) => {
  // Authenticated user
  const user = useAuthStore((state) => state.user);

  // Refs
  const inputRef = useRef(null);
  const previewUrlRef = useRef(null);

  const inputId = useId();

  // Component state
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  // User information
  const profileImage = getImageUrl(user?.profile?.profile_image);

  const displayImage = previewUrl || profileImage;

  // Cleanup temporary image URLs
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, []);

  // Open file picker
  const openFilePicker = () => {
    inputRef.current?.click();
  };

  // Handle image selection
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    // Allow selecting the same image again
    event.target.value = "";

    if (!file) return;

    setError("");

    // Validate image type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Please select a JPG, PNG, or WEBP image.");
      return;
    }

    // Validate image size
    if (file.size > MAX_FILE_SIZE) {
      setError("Image size must not exceed 5 MB.");
      return;
    }

    // Create image preview
    const objectUrl = URL.createObjectURL(file);

    // Remove previous preview URL
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    previewUrlRef.current = objectUrl;

    setPreviewUrl(objectUrl);

    // Send original file to parent component
    onImageSelect?.(file);
  };

  // User contact information
  const contactDetails = [
    {
      value: user?.email,
      icon: Mail,
      label: "Email",
      visible: Boolean(user?.email),
    },
    {
      value: user?.phone_number,
      icon: Phone,
      label: "Phone",
      visible: Boolean(user?.phone_number),
    },
    {
      value: user?.profile?.address,
      icon: MapPin,
      label: "Address",
      visible: user?.role === STUDENT_ROLE && Boolean(user?.profile?.address),
    },
  ].filter((item) => item.visible);

  return (
    <section
      aria-label="User profile information"
      className="
        w-full min-w-0
        overflow-hidden
        rounded-xl
        p-4
        sm:rounded-2xl sm:p-5
        lg:p-6
        xl:p-8
      "
    >
      <div
        className="
          flex w-full min-w-0
          flex-col items-center gap-6
          sm:gap-7
          md:flex-row md:items-center
          md:gap-8
          lg:gap-10
          xl:gap-12
        "
      >
        {/* Profile Image Section */}
        <div
          className="
            flex shrink-0 flex-col
            items-center justify-center
            gap-3
            md:items-center
          "
        >
          {/* Image and Camera Button */}
          <div className="relative">
            <Image
              src={displayImage || placeholder}
              alt={`${user?.full_name || "User"} profile picture`}
              width={180}
              height={180}
              priority
              unoptimized={Boolean(previewUrl)}
              className="
                h-28 w-28
                rounded-full
                border-4 border-primary
                bg-slate-100
                object-cover
                shadow-md
                sm:h-32 sm:w-32
                md:h-36 md:w-36
                lg:h-40 lg:w-40
                xl:h-44 xl:w-44
              "
            />

            {/* Change Image Button */}
            <button
              type="button"
              onClick={openFilePicker}
              aria-label="Change profile picture"
              title="Change profile picture"
              className="
                absolute bottom-1 right-1
                flex h-9 w-9
                items-center justify-center
                rounded-full
                border-2 border-white
                bg-primary text-white
                shadow-md
                transition-all duration-200
                hover:bg-primary-hover
                hover:scale-105
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                sm:h-10 sm:w-10
              "
            >
              <Camera size={19} aria-hidden="true" />
            </button>
          </div>

          {/* Account Role */}
          <span
            className="
              rounded-full
              bg-primary/10
              px-3 py-1
              text-xs font-semibold
              capitalize text-primary
              sm:text-sm
            "
          >
            {user?.role || "User"} Account
          </span>
        </div>

        {/* User Information Section */}
        <div
          className="
            flex min-w-0 w-full flex-1
            flex-col items-center
            gap-4 text-center
            sm:gap-5
            md:items-start
            md:text-left
          "
        >
          {/* Name and Description */}
          <div className="w-full min-w-0">
            <h2
              className="
                wrap-break-word
                text-xl font-bold text-heading
                sm:text-2xl
                lg:text-3xl
              "
            >
              {user?.full_name || "Your Name"}
            </h2>

            <p className="mt-1 flex items-center gap-1.5 bg-primary/10 w-fit px-2 rounded-lg text-xs leading-relaxed sm:text-sm">
              {user?.role === TEACHER_ROLE && user?.is_verified_teacher ? (
                <>
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-600">Verified</span>
                </>
              ) : (
                <>
                  <ShieldX className="h-4 w-4 text-red-500" />
                  <span className="font-medium text-red-500">Unverified</span>
                </>
              )}
            </p>
          </div>

          {/* Contact Information */}
          {contactDetails.length > 0 && (
            <div
              className="
                flex w-full min-w-0
                flex-wrap justify-center
                gap-2
                md:justify-start
                lg:gap-3
              "
            >
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    title={item.value}
                    className="
                      flex min-w-0 max-w-full
                      items-center gap-2
                      rounded-lg
                      bg-slate-100
                      px-3 py-2
                      text-xs text-body-text
                      sm:text-sm
                    "
                  >
                    <Icon
                      size={16}
                      className="shrink-0 text-primary"
                      aria-hidden="true"
                    />

                    <span
                      className="
                        min-w-0
                        break-all
                        sm:wrap-break-word
                      "
                    >
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Upload Section */}
          <div
            className="
              flex w-full flex-col
              items-center gap-2
              md:items-start
            "
          >
            <button
              type="button"
              onClick={openFilePicker}
              className="
                inline-flex
                w-full items-center justify-center
                gap-2
                rounded-lg
                bg-primary
                px-5 py-2.5
                text-sm font-semibold text-white
                shadow-sm
                transition-all duration-200
                hover:bg-primary-hover
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                active:scale-[0.98]
                sm:w-auto
              "
            >
              <Upload size={17} aria-hidden="true" />
              Upload New Picture
            </button>

            <p className="text-center text-xs text-muted-text md:text-left">
              JPG, PNG or WEBP. Maximum file size: 5 MB.
            </p>

            {/* Validation Error */}
            {error && (
              <p
                role="alert"
                aria-live="polite"
                className="
                  text-center text-sm
                  font-medium text-error
                  md:text-left
                "
              >
                {error}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES}
        className="sr-only"
        tabIndex={-1}
        aria-label="Select profile picture"
        onChange={handleFileChange}
      />
    </section>
  );
};

export default ProfileImage;
