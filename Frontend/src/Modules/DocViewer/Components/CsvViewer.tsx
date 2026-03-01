import { useEffect, useState } from "react";
import Papa from "papaparse";

interface CsvViewerProps {
  file: File;
}

const CsvViewer = ({ file }: CsvViewerProps) => {
  const [data, setData] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parseCsv = () => {
      setLoading(true);
      setError(null);

      Papa.parse(file, {
        complete: (results) => {
          setData(results.data as string[][]);
          setLoading(false);
        },
        error: (err) => {
          console.error("Error al leer CSV:", err);
          setError("Error al procesar el archivo CSV: " + err.message);
          setLoading(false);
        },
        header: false,
        skipEmptyLines: true,
        preview: 1000,
        encoding: "UTF-8",
      });
    };

    if (file) {
      parseCsv();
    }
  }, [file]);

  if (loading) return <div className="csv-status-loading">Analizando CSV...</div>;
  if (error) return <div className="csv-status-error">{error}</div>;

  return (
    <div className="docviewer__csv">
      <div className="csv-table-container">
        <table className="csv-table">
          <thead className="csv-thead">
            <tr>
              {/* Renderizamos la primera fila como cabecera */}
              {data[0]?.map((cell, index) => (
                <th key={index} className="csv-th">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Renderizamos el resto de filas */}
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} className="csv-row">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="csv-td">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && <div className="csv-empty-message">El archivo CSV parece estar vacío.</div>}
      </div>

      <div className="csv-footer">Mostrando {data.length > 0 ? data.length - 1 : 0} registros</div>
    </div>
  );
};

export default CsvViewer;
