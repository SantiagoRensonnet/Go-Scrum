export const limitString = (str) => {
  const maxChar = 128;
  if (str.length > maxChar) {
    return str.slice(0, maxChar - 3).concat("...");
  }
  return str;
};
