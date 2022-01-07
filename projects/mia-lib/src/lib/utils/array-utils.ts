/** 
 * @description check duplicated values
 * @returns boolean
 */

const hasDuplicates = (array: Array<unknown>): boolean => new Set(array).size !== array.length;

/** 
 * @description check duplicated values
 * @returns true if the deprecate function returns true for ALL, otherwise is false
 */

const all = (array: Array<unknown>, fn = Boolean): boolean => array.every(fn);

/** 
 * @returns capitalize every word
 */

const capitalize = (words: string): string => words.replace(/\b[a-z]/g, character => character.toUpperCase());

/** 
 * @returns flattens an array recursively.
 */

const deepFlatten = (array: Array<unknown>): Array<unknown> => [].concat(...array.map(item => (Array.isArray(item) ? deepFlatten(item) : item)));

/** 
 * @returns finds the difference between two arrays
 */

const difference = (array_1: Array<unknown>, array_2: Array<unknown>): Array<unknown> => array_1.filter(item => !new Set(array_2).has(item));

/** 
 * @returns finds the difference between two arrays, after applying a given function to each element of both lists
 */

const differenceBy = (array_1: Array<unknown>, array_2: Array<unknown>, fn: Function): Array<unknown> => array_1.filter(item => !new Set(array_2).has(fn(item)));

export { hasDuplicates, deepFlatten };

