import type { DocInfo } from "@/api";
import { Button } from "@/Modules/Common";
import DocText from "./DocText";
import { splitFilename } from "@/utls/formatters";
import { useDocs } from "@/Context/DocsContext";

interface DocProps {
  doc: DocInfo;
}

function Doc({ doc }: DocProps) {
  const { name, extension } = splitFilename(doc.name);
  const { openDoc } = useDocs();

  const onClick = () => {
    openDoc(doc.id, doc.name);
  };

  return (
    <li className="docs__doc-item">
      <Button className="docs__doc-item-btn" onClick={onClick}>
        <DocText name={name} extension={extension} />
      </Button>
    </li>
  );
}

export default Doc;
