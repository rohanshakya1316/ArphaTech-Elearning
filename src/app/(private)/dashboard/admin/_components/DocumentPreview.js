"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FileText, Download, ExternalLink, AlertCircle } from "lucide-react";
import Image from "next/image";

const PDFPreview = dynamic(() => import("@/helpers/pdfViwer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-150 items-center justify-center">
      <p className="text-sm text-body">Loading PDF viewer...</p>
    </div>
  ),
});

const DocumentPreview = ({ fileUrl }) => {
  const [error, setError] = useState(false);

  if (!fileUrl) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-background p-10 text-center">
        <AlertCircle className="text-muted" size={35} />

        <p className="mt-3 font-medium text-heading">
          No verification document uploaded
        </p>
      </div>
    );
  }

  const extension = fileUrl.split("?")[0].split(".").pop().toLowerCase();

  const isImage = ["jpg", "jpeg", "png", "webp"].includes(extension);
  const isPDF = extension === "pdf";

  if (!isImage && !isPDF) {
    return <p className="text-sm text-error">Unsupported document format.</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-card">
      {/* Document toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-primary" />

          <span className="text-sm font-medium text-heading">
            Verification Document
          </span>
        </div>

        <div className="flex gap-3">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <ExternalLink size={14} />
            Open
          </a>

          <a
            href={fileUrl}
            download
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <Download size={14} />
            Download
          </a>
        </div>
      </div>

      {/* Preview */}
      <div className="flex min-h-87.5 items-center justify-center bg-slate-100 p-3 md:min-h-137.5">
        {error ? (
          <p className="text-sm text-error">Unable to load the document.</p>
        ) : isImage ? (
          <Image
            src={fileUrl}
            alt="Teacher verification document"
            loading="eager"
            width={1000}
            height={700}
            unoptimized
            onError={() => setError(true)}
            className="max-h-130 w-auto max-w-full rounded-md object-contain"
          />
        ) : (
          <PDFPreview fileUrl={fileUrl} />
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;
