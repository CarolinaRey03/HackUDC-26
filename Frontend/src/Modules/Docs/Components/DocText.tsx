import PdfIcon from "@/assets/pdf-file.svg?react";
import DocxIcon from "@/assets/docx-file.svg?react";
import TxtIcon from "@/assets/txt-file.svg?react";
import OdtIcon from "@/assets/odt.svg?react";
import CsvIcon from "@/assets/csv.svg?react";
import XlsIcon from "@/assets/xls-file.svg?react";
import UnsupportedFileIcon from "@/assets/unsupported-file.svg?react";

const decideIcon = (extension: string): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
  switch (extension) {
    case "pdf":
      return PdfIcon;
    case "docx":
      return DocxIcon;
    case "odt":
      return OdtIcon;
    case "csv":
      return CsvIcon;
    case "txt":
      return TxtIcon;
    case "xls":
      return XlsIcon;
    case "ods":
      return OdtIcon;
    case "xlsx":
      return XlsIcon;
    default:
      return UnsupportedFileIcon;
  }
};

const decideColor = (extension: string): string => {
  switch (extension) {
    case "pdf":
      return "#C58F8F";
    case "docx":
      return "#8FA9C5";
    case "odt":
      return "#9D8FC5";
    case "txt":
      return "#8FC59D";
    case "csv":
      return "#C5A98F";
    case "xls":
    case "xlsx":
    case "ods":
      return "#8FC5B3";
    default:
      return "#A9A9A9";
  }
};

interface DocTextProps {
  name: string;
  extension: string;
}

function DocText({ name, extension }: DocTextProps) {
  const Icon = decideIcon(extension);
  const iconColor = decideColor(extension);

  return (
    <span className="docs__doc-item-btn">
      <Icon style={{ color: iconColor }} />
      <span className="docs__doc-item-name">{name}</span>
    </span>
  );
}

export default DocText;
