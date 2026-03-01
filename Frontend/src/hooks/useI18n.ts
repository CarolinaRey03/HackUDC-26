import { useIntl } from "react-intl";

const PLACEHOLDER_REGEX = /{([^}]+)}/g;

function mapArgsToValues(message: string, args: string[]): Record<string, string> {
  const values: Record<string, string> = {};

  let match;
  let index = 0;

  while ((match = PLACEHOLDER_REGEX.exec(message)) !== null) {
    const placeholder = match[1];

    if (index < args.length) {
      values[placeholder] = args[index];
      index++;
    } else {
      values[placeholder] = "";
    }
  }

  return values;
}

function useI18n() {
  const intl = useIntl();

  const translate = (msg: string, args?: string[]): string => {
    const messageTemplate = intl.formatMessage({ id: msg });

    if (!args) {
      return messageTemplate;
    }

    const values = mapArgsToValues(messageTemplate, args);
    return intl.formatMessage({ id: msg }, values);
  };

  return { translate };
}

export default useI18n;
