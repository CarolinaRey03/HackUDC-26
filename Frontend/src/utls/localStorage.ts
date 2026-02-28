const scriptSplitSizesItem = "script_split_sizes";

export const setScriptSplitSizes = (sizes: number[]) => {
  localStorage.setItem(scriptSplitSizesItem, JSON.stringify(sizes));
};

export const getScriptSplitSizes = (): number[] | undefined => {
  const stored = localStorage.getItem(scriptSplitSizesItem);

  if (!stored) return undefined;

  return JSON.parse(stored) as number[];
};
