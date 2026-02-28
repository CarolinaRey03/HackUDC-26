import { getAllDocs, type DocInfo } from "@/api";
import { RESULTS_LIMIT } from "@/utls/constants";
import { toastMsg } from "@/utls/toastMsg";
import { useEffect, useState } from "react";

function Docs() {
  const [docs, setDocs] = useState<DocInfo[]>([]);

  useEffect(() => {
    getAllDocs(RESULTS_LIMIT)
      .then(setDocs)
      .catch(() => toastMsg.error("Failed to fetch docs"));
  }, []);

  return (
    <div>
      {docs.map((doc) => (
        <div>{doc.name}</div>
      ))}
    </div>
  );
}

export default Docs;
