import { splitFilename } from "@/utls/formatters";
import "@react-pdf-viewer/core/lib/styles/index.css";
import PdfViewer from "./PdfViewer";
import TxtViewer from "./TxtViewer";
import DocxViewer from "./DocxViewer";

interface DocViewerProps {
  file: File;
}

const decideViewer = (file: File, extension: string) => {
  console.log({ extension });
  switch (extension.toLocaleLowerCase()) {
    case "pdf":
      return <PdfViewer file={file} />;
    case "txt":
      return <TxtViewer file={file} />;
    case "docx":
      return <DocxViewer file={file} />;
    // TODO: return something in case of error
    default:
      return null;
  }
};

function DocViewer({ file }: DocViewerProps) {
  const { extension } = splitFilename(file.name);

  return <div className="docviewer">{decideViewer(file, extension)}</div>;
}

export default DocViewer;
