import type { DocInfo } from "@/api";
import PdfIcon from "@/assets/pdf-file.svg?react";
import DocxIcon from "@/assets/docx-file.svg?react";
import TxtIcon from "@/assets/txt-file.svg?react";
import UnsupportedFileIcon from "@/assets/unsupported-file.svg?react";
import { Button } from "@/Modules/Common";

interface DocProps {
  doc: DocInfo;
}

function splitFilename(filename: string): { name: string; extension: string } {
  const lastDot = filename.lastIndexOf(".");

  if (lastDot === -1) {
    return { name: filename, extension: "" };
  }

  const name = filename.slice(0, lastDot);
  const extension = filename.slice(lastDot + 1);

  return { name, extension };
}

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

function Doc({ doc }: DocProps) {
  const { name, extension } = splitFilename(doc.name);
  const Icon = decideIcon(extension);
  const iconColor = decideColor(extension);

  return (
    <li className="docs__doc-item">
      <Button className="docs__doc-item-btn">
        <Icon style={{ color: iconColor }} />
        <span className="docs__doc-item-name">{name}</span>
      </Button>
    </li>
  );
}

export default Doc;
