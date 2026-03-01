import { useState } from "react";
import { deleteDoc, getDocInfo, type DocInfo } from "@/api";
import { Button } from "@/Modules/Common";
import DocText from "./DocText";
import { splitFilename } from "@/utls/formatters";
import { useDocs } from "@/Context/DocsContext";
import { toastMsg } from "@/utls/toastMsg";
import InfoIcon from "@/assets/info.svg?react";
import useI18n from "@/hooks/useI18n";
import DocMetadataModal from "@/Modules/Modal/Components/DocMetadataModal";

interface DocProps {
  doc: DocInfo;
}

function Doc({ doc }: DocProps) {
  const { translate } = useI18n();
  const { name, extension } = splitFilename(doc.name);
  const { openDoc, docs, updateDocs } = useDocs();
  const [metadataInfo, setMetadataInfo] = useState<DocInfo | null>(null);
  console.log({ metadataInfo });

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

  const onInfo = () => {
    getDocInfo(doc.id)
      .then(setMetadataInfo)
      .catch(() => toastMsg.error(translate("error.open.doc")));
  };

  return (
    <>
      <li className="docs__doc-item">
        <Button className="docs__doc-item-btn" onClick={onClick}>
          <DocText name={name} extension={extension} />
        </Button>
        {/* <Button onClick={onDelete} className="docs__delete-btn">
          <DeleteIcon />
        </Button> */}
        <Button onClick={onInfo} className="docs__info-btn">
          <InfoIcon />
        </Button>
      </li>
      {metadataInfo && <DocMetadataModal metadata={metadataInfo} onClose={() => setMetadataInfo(null)} />}
    </>
  );
}

export default Doc;
