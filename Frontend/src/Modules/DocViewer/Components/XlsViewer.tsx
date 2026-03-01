import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

interface XlsViewerProps {
  file: File;
}

const XlsViewer = ({ file }: XlsViewerProps) => {
  // Usamos any[][] porque Excel puede tener números, fechas o booleanos, no solo strings
  const [data, setData] = useState<any[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parseExcel = async () => {
      setLoading(true);
      setError(null);

      try {
        // Leemos el archivo como ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();

        // Analizamos el workbook
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        // Asumimos que queremos leer la primera hoja
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convertimos la hoja a JSON (array de arrays)
        // header: 1 nos da un array de arrays crudo, similar a PapaParse
        // defval: "" asegura que las celdas vacías no sean undefined
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "",
        });

        setData(jsonData as any[][]);
      } catch (err: any) {
        console.error("Error al leer Excel:", err);
        setError("Error al procesar el archivo Excel: " + (err.message || "Formato inválido"));
      } finally {
        setLoading(false);
      }
    };

    if (file) {
      parseExcel();
    }
  }, [file]);

  if (loading) return <div className="csv-status-loading">Analizando Excel...</div>;
  if (error) return <div className="csv-status-error">{error}</div>;

  return (
    <div className="docviewer__xls">
      <div className="csv-table-container">
        <table className="csv-table">
          <thead className="csv-thead">
            <tr>
              {/* Renderizamos la primera fila como cabecera */}
              {data[0]?.map((cell: any, index: number) => (
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
                {row.map((cell: any, cellIndex: number) => (
                  <td key={cellIndex} className="csv-td">
                    {/* Renderizamos cell tal cual, o lo convertimos a string si es objeto */}
                    {String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && <div className="csv-empty-message">El archivo Excel parece estar vacío.</div>}
      </div>

      <div className="csv-footer">Mostrando {data.length > 0 ? data.length - 1 : 0} registros</div>
    </div>
  );
};

export default XlsViewer;
