import { useEffect, useState } from "react";
import JSZip from "jszip";

interface OdtViewerProps {
  file: File;
}

const OdtViewer = ({ file }: OdtViewerProps) => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processOdt = async () => {
      setLoading(true);
      setError(null);
      setHtmlContent("");

      try {
        // 1. Leer el archivo como ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();

        // 2. Descomprimir el ZIP (el .odt es un zip)
        const zip = await JSZip.loadAsync(arrayBuffer);

        // 3. Buscar el archivo "content.xml" que tiene el texto
        const contentXml = await zip.file("content.xml")?.async("string");

        if (!contentXml) {
          throw new Error("No se encontró content.xml en el archivo ODT.");
        }

        // 4. Parsear el XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(contentXml, "text/xml");

        // 5. Transformar XML a HTML simple
        // Los archivos ODT usan namespaces como <text:p>, <text:h>, etc.
        const body = xmlDoc.getElementsByTagName("office:text")[0];
        let generatedHtml = "";

        if (body) {
          // Recorremos los nodos hijos para mantener el orden
          Array.from(body.childNodes).forEach((node) => {
            if (node.nodeName === "text:p") {
              // Párrafos
              generatedHtml += `<p style="margin-bottom: 1rem;">${node.textContent}</p>`;
            } else if (node.nodeName === "text:h") {
              // Títulos (Headers)
              generatedHtml += `<h3 style="color: #2b2b2b; margin-top: 1.5rem; font-weight: bold;">${node.textContent}</h3>`;
            } else if (node.nodeName === "text:list") {
              // Listas (básicas)
              generatedHtml += `<ul style="list-style-type: disc; margin-left: 20px;">`;
              Array.from(node.childNodes).forEach((li) => {
                generatedHtml += `<li>${li.textContent}</li>`;
              });
              generatedHtml += `</ul>`;
            }
          });
        }

        setHtmlContent(generatedHtml);
      } catch (err) {
        console.error("Error al leer ODT:", err);
        setError("No se pudo visualizar el archivo. Puede estar corrupto.");
      } finally {
        setLoading(false);
      }
    };

    if (file) {
      processOdt();
    }
  }, [file]);

  return (
    <div style={{ height: "100%" }}>
      {loading && <div className="text-center p-4">Procesando archivo ODT...</div>}
      {error && <div className="text-center text-red-500 p-4">{error}</div>}

      {!loading && !error && (
        <div className="docviewer__odt">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      )}
    </div>
  );
};

export default OdtViewer;
