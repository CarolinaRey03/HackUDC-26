import { useEffect, useRef, useState } from "react";
import { renderAsync } from "docx-preview";

interface DocxViewerProps {
  file: File;
}

// TODO: fix the preview size
function DocxViewer({ file }: DocxViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderDocx = async () => {
      if (!containerRef.current) return;
      setLoading(true);
      setError(null);

      try {
        const arrayBuffer = await file.arrayBuffer();
        if (isMounted && containerRef.current) {
          await renderAsync(arrayBuffer, containerRef.current, undefined, {
            className: "docx-preview",
            inWrapper: true,
            ignoreLastRenderedPageBreak: false,
          });
        }
      } catch (err) {
        console.error("Error rendering docx:", err);
        if (isMounted) {
          setError("Error al previsualizar el documento Word.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    renderDocx();

    return () => {
      isMounted = false;
    };
  }, [file]);

  return (
    <div className="docx-viewer" style={{ width: "100%", height: "100%", overflow: "auto", background: "white" }}>
      {loading && <div style={{ padding: "20px" }}>Cargando documento...</div>}
      {error && <div style={{ padding: "20px", color: "red" }}>{error}</div>}
      <div ref={containerRef} style={{ width: "100%" }} />
    </div>
  );
}

export default DocxViewer;
