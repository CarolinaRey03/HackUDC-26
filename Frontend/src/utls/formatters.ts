export function splitFilename(filename: string): { name: string; extension: string } {
  const lastDot = filename.lastIndexOf(".");

  if (lastDot === -1) {
    return { name: filename, extension: "" };
  }

  const name = filename.slice(0, lastDot);
  const extension = filename.slice(lastDot + 1);

  return { name, extension };
}
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
