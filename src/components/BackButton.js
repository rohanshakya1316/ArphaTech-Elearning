"use client";

import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      type="button"
      className="flex items-center gap-2 text-xl text-accent cursor-pointer"
    >
      Back
      <Undo2 />
    </button>
  );
};

export default BackButton;
