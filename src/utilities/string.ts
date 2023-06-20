/**
 *
 * @param str (string)
 * @returns string
 *
 * @example hello there => Hello there
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
