export function splitFilename(filename: string): { name: string; extension: string } {
  const lastDot = filename.lastIndexOf(".");

  if (lastDot === -1) {
    return { name: filename, extension: "" };
  }

  const name = filename.slice(0, lastDot);
  const extension = filename.slice(lastDot + 1);

  return { name, extension };
}
