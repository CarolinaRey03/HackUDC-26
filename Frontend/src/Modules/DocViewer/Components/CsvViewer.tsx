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
          // results.data es un array de arrays: [['Col1', 'Col2'], ['Val1', 'Val2']]
          setData(results.data as string[][]);
          setLoading(false);
        },
        error: (err) => {
          console.error("Error al leer CSV:", err);
          setError("Error al procesar el archivo CSV: " + err.message);
          setLoading(false);
        },
        header: false, // Lo dejamos en false para recibir arrays puros y pintar la tabla manualmente
        skipEmptyLines: true,
        preview: 1000, // Opcional: Limita a las primeras 1000 filas por rendimiento
        encoding: "UTF-8", // Intenta forzar UTF-8 para acentos
      });
    };

    if (file) {
      parseCsv();
    }
  }, [file]);

  if (loading) return <div className="p-4 text-center">Analizando CSV...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;

  return (
    <div className="flex flex-col h-full bg-gray-100 p-4">
      <div className="bg-white shadow-md border rounded overflow-auto" style={{ height: "600px", maxWidth: "100%" }}>
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0">
            <tr>
              {/* Renderizamos la primera fila como cabecera */}
              {data[0]?.map((cell, index) => (
                <th key={index} className="px-6 py-3 border-b border-gray-300 whitespace-nowrap">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Renderizamos el resto de filas */}
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 border-r border-gray-100 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && <div className="p-10 text-center text-gray-500">El archivo CSV parece estar vacío.</div>}
      </div>

      <div className="text-xs text-gray-500 mt-2 text-right">
        Mostrando {data.length > 0 ? data.length - 1 : 0} registros
      </div>
    </div>
  );
};

export default CsvViewer;
