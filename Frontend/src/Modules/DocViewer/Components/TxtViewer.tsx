import { useEffect, useState } from "react";

interface TxtViewerProps {
  file: File;
}

function TxtViewer({ file }: TxtViewerProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const readFile = async () => {
      setLoading(true);
      try {
        const text = await file.text();

        if (isMounted) {
          setContent(text);
        }
      } catch (error) {
        console.error("Error al leer el archivo:", error);
        if (isMounted) {
          setContent("Error al leer el archivo.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    readFile();

    return () => {
      isMounted = false;
    };
  }, [file]);

  if (loading) {
    return <div>Cargando contenido...</div>;
  }

  return (
    <textarea
      name="txt-file"
      value={content}
      readOnly
      style={{ width: "100%", height: "100%", fontFamily: "monospace", resize: "none" }}
    />
  );
}

export default TxtViewer;
