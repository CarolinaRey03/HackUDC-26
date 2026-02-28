import { getAllDocs, type DocInfo } from "@/api";
import { RESULTS_LIMIT } from "@/utls/constants";
import { toastMsg } from "@/utls/toastMsg";
import { useEffect, useState } from "react";
import Doc from "./Doc";

function Docs() {
  const [docs, setDocs] = useState<DocInfo[]>([]);

  useEffect(() => {
    getAllDocs(RESULTS_LIMIT)
      .then(setDocs)
      .catch(() => toastMsg.error("Failed to fetch docs"));
  }, []);

  return (
    <div className="docs">
      <ul className="docs__list">
        {docs.map((doc) => (
          <Doc key={doc.id} doc={doc} />
        ))}
      </ul>
    </div>
  );
}

export default Docs;
