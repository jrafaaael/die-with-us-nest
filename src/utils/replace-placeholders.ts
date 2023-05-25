interface Params {
  str: string;
  placeholders: {
    [key: string]: unknown;
  };
}

export function replacePlaceholders({ str, placeholders }: Params) {
  let updatedStr = str;

  Object.keys(placeholders).forEach((placeholder) => {
    const regex = new RegExp(`{${placeholder}}`, "g");
    updatedStr = updatedStr.replace(regex, String(placeholders[placeholder]));
  });

  return updatedStr;
}
