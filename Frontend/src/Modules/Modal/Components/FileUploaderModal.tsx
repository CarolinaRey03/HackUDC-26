import { useState, type ChangeEvent } from "react";
import Modal from "./Modal";
import UploadIcon from "@/assets/upload.svg?react";
import DocText from "@/Modules/Docs/Components/DocText";
import { splitFilename } from "@/utls/formatters";
import { Button } from "@/Modules/Common";
import useI18n from "@/hooks/useI18n";
import Title from "@/Modules/Common/Components/Title";
import { uploadDoc } from "@/api";
import { toastMsg } from "@/utls/toastMsg";

interface FileUploaderProps {
  onClose: () => void;
}

export default function FileUploaderModal({ onClose }: FileUploaderProps) {
  const { translate } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const { name, extension } = splitFilename(file?.name ?? "");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  async function handleFileUpload() {
    if (!file) return;

    toastMsg.info(translate("uploadFile.info"));

    uploadDoc(file)
      .then(() => toastMsg.success(translate("uploadFile.success")))
      .catch(() => toastMsg.error(translate("uploadFile.error")));

    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <div className="fileuploader">
        <div className="fileuploader__icon">
          <UploadIcon />
        </div>
        <Title>{translate("modal.uploadTitle")}</Title>

        <span className="fileuploader__file">
          <DocText name={name} extension={extension} />
          <input type="file" onChange={handleFileChange} />
        </span>

        <Button onClick={handleFileUpload} className="fileuploader__btn" disabled={!file}>
          {translate("modal.upload")}
        </Button>
      </div>
    </Modal>
  );
}
