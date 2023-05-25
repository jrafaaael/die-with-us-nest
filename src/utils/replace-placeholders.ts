interface Params {
  str: string;
  placeholders: {
    [key: string]: unknown;
  };
}

export function replacePlaceholders({ str, placeholders }: Params) {
  const regex = new RegExp(`\\${placeholders}`, "g");
  let result = "";

  for (const [_, value] of Object.entries(placeholders)) {
    const valueStringified = String(value);
    result = str.replace(regex, valueStringified);
    console.log(result);
  }

  return result;
}
