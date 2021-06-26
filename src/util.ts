const hasNonEmptyValue =
  <T>(someObj: T) =>
  (key: keyof T) =>
    someObj.hasOwnProperty(key) && someObj[key];

export { hasNonEmptyValue };
