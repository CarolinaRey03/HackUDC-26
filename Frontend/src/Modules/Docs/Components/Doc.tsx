import { deleteDoc, type DocInfo } from "@/api";
import { Button } from "@/Modules/Common";
import DocText from "./DocText";
import { splitFilename } from "@/utls/formatters";
import { useDocs } from "@/Context/DocsContext";
import { toastMsg } from "@/utls/toastMsg";
import DeleteIcon from "@/assets/delete.svg?react";
import useI18n from "@/hooks/useI18n";

interface DocProps {
  doc: DocInfo;
}

function Doc({ doc }: DocProps) {
  const { translate } = useI18n();
  const { name, extension } = splitFilename(doc.name);
  const { openDoc, docs, updateDocs } = useDocs();

  const onClick = () => {
    openDoc(doc.id, doc.name);
  };

  const onDelete = () => {
    deleteDoc(doc.id)
      .then(() => {
        updateDocs(docs.filter((d) => d.id !== doc.id));
      })
      .catch(() => toastMsg.error(translate("error.delete")));
  };

  return (
    <li className="docs__doc-item">
      <Button className="docs__doc-item-btn" onClick={onClick}>
        <DocText name={name} extension={extension} />
      </Button>
      <Button onClick={onDelete} className="docs__delete-btn">
        <DeleteIcon />
      </Button>
    </li>
  );
}

export default Doc;
