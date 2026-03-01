import Modal from "./Modal";
import { formatFileSize } from "@/utls/formatters";
import useI18n from "@/hooks/useI18n";
import { Title } from "@/Modules/Common";
import type { DocInfo } from "@/api";
import BodyText from "@/Modules/Common/Components/BodyText";

interface DocMetadataModalProps {
  metadata: DocInfo;
  onClose: () => void;
}

export default function DocMetadataModal({ metadata, onClose }: DocMetadataModalProps) {
  const { translate } = useI18n();

  return (
    <Modal onClose={onClose}>
      <div className="doc-metadata">
        <Title>{translate("modal.metadata.header")}</Title>
        <div className="doc-metadata__content">
          <BodyText>
            <strong>{translate("modal.metadata.name")}:</strong> {metadata.name}
          </BodyText>
          {metadata.title && (
            <BodyText>
              <strong>{translate("modal.metadata.title")}:</strong> {metadata.title}
            </BodyText>
          )}
          {metadata.author && (
            <BodyText>
              <strong>{translate("modal.metadata.author")}:</strong> {metadata.author}
            </BodyText>
          )}
          {metadata.category && (
            <BodyText>
              <strong>{translate("modal.metadata.category")}:</strong> {metadata.category}
            </BodyText>
          )}
          {metadata.language && (
            <BodyText>
              <strong>{translate("modal.metadata.language")}:</strong> {metadata.language}
            </BodyText>
          )}
          {metadata.size && (
            <BodyText>
              <strong>{translate("modal.metadata.size")}:</strong> {formatFileSize(metadata.size)}
            </BodyText>
          )}
          {metadata.file_type && (
            <BodyText>
              <strong>{translate("modal.metadata.type")}:</strong> {metadata.file_type}
            </BodyText>
          )}
          {metadata.created_at && (
            <BodyText>
              <strong>{translate("modal.metadata.modified")}:</strong>{" "}
              {new Date(metadata.created_at * 1000).toLocaleString()}
            </BodyText>
          )}
        </div>
      </div>
    </Modal>
  );
}
