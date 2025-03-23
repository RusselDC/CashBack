export const prettifyString = (str: string) => {
  let prettyString = str.trim();
  prettyString = prettyString.replace(/[_-]/g, " ").toLowerCase();
  prettyString = prettyString.replace(/\b\w/g, (char) => char.toUpperCase());
  return prettyString;
};
