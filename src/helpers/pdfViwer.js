"use client";

import { PDFViewer } from "@embedpdf/viewer-react";

const PDFPreview = ({ fileUrl }) => {
  return (
    <div className="h-150 w-full">
      <PDFViewer src={fileUrl} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default PDFPreview;
