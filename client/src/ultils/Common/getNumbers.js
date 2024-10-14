export const getNumbers = (string) =>
  string
    .split(" ")
    .map((item) => +item)
    .filter((item) => !item === false);
