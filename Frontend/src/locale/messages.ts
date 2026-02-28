import { en } from "./languages/en";
import { es } from "./languages/es";

function flattenMessages(nestedMessages: any, prefix = ""): Record<string, string> {
  return Object.entries(nestedMessages).reduce(
    (acc, [key, value]) => {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "string") {
        acc[prefixedKey] = value;
      } else {
        Object.assign(acc, flattenMessages(value, prefixedKey));
      }

      return acc;
    },
    {} as Record<string, string>,
  );
}

export const messages = {
  es: flattenMessages(es),
  en: flattenMessages(en),
};
