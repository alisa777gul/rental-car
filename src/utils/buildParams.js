/* eslint-disable no-unused-vars */
export const buildSearchParams = (paramsObj) => {
  return Object.fromEntries(
    Object.entries(paramsObj)
      .filter(
        ([key, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(([key, value]) => [key, value.toString()])
  );
};
