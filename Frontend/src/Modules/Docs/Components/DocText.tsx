import PdfIcon from "@/assets/pdf-file.svg?react";
import DocxIcon from "@/assets/docx-file.svg?react";
import TxtIcon from "@/assets/txt-file.svg?react";
import UnsupportedFileIcon from "@/assets/unsupported-file.svg?react";

const decideIcon = (extension: string): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
  switch (extension) {
    case "txt":
      return TxtIcon;
    case "pdf":
      return PdfIcon;
    case "docx":
      return DocxIcon;
    default:
      return UnsupportedFileIcon;
  }
};

const decideColor = (extension: string): string => {
  switch (extension) {
    case "pdf":
      return "#C58F8F"; // Red
    case "docx":
      return "#8FA9C5"; // Blue
    case "txt":
      return "#8FC59D"; // Green
    default:
      return "#95a5a6"; // Gray
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
