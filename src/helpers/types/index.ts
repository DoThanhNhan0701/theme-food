export type Dictionary<T extends string = string> = {
  [key in T]: Record<string, string>;
};
