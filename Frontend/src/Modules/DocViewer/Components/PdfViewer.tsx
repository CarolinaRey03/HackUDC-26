import { useState, useEffect } from "react";

interface PdfViewerProps {
  file: File;
}

const PdfViewer = ({ file }: PdfViewerProps) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setPdfUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  if (!pdfUrl) return <div>Cargando PDF...</div>;

  return <iframe src={pdfUrl} width="100%" height="100%" title="Visor PDF" style={{ border: "none" }} />;
};

export default PdfViewer;
