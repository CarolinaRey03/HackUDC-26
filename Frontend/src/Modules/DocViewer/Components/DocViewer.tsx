import { splitFilename } from "@/utls/formatters";
import PdfViewer from "./PdfViewer";
import TxtViewer from "./TxtViewer";
import DocxViewer from "./DocxViewer";
import OdtViewer from "./OdtViewer";
import CsvViewer from "./CsvViewer";
import BodyText from "@/Modules/Common/Components/BodyText";
import useI18n from "@/hooks/useI18n";
import XlsViewer from "./XlsViewer";

interface DocViewerProps {
  file: File;
}

function DocViewer({ file }: DocViewerProps) {
  const { translate } = useI18n();
  const { extension } = splitFilename(file.name);

  const decideViewer = (file: File, extension: string) => {
    switch (extension.toLocaleLowerCase()) {
      case "pdf":
        return <PdfViewer file={file} />;
      case "txt":
        return <TxtViewer file={file} />;
      case "docx":
        return <DocxViewer file={file} />;
      case "odt":
        return <OdtViewer file={file} />;
      case "csv":
        return <CsvViewer file={file} />;
      case "xlsx":
      case "xls":
      case "ods":
        return <XlsViewer file={file} />;
      default:
        return <BodyText>{translate("error.unsupportedType")}</BodyText>;
    }
  };

  return <div className="docviewer">{decideViewer(file, extension)}</div>;
}

export default DocViewer;
