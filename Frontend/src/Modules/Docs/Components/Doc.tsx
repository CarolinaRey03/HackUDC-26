import type { DocInfo } from "@/api";
import { Button } from "@/Modules/Common";
import DocText from "./DocText";
import { splitFilename } from "@/utls/formatters";

interface DocProps {
  doc: DocInfo;
}

function Doc({ doc }: DocProps) {
  const { name, extension } = splitFilename(doc.name);

  return (
    <li className="docs__doc-item">
      <Button className="docs__doc-item-btn">
        <DocText name={name} extension={extension} />
      </Button>
    </li>
  );
}

export default Doc;
