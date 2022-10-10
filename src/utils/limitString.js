export const limitString = (str) => {
  const maxChar = 128;
  if (str.length > maxChar) {
    return {
      string: str,
      limitedString: str.slice(0, maxChar - 3).concat("..."),
      state: "limited",
    };
  }
  return { limitedString: str, state: "original" };
};
