import isEqual from 'lodash.isequal';

/** 
 * @description check duplicated values
 * @returns boolean
 */

const hasDuplicates = (array: Array<unknown>): boolean => new Set(array).size !== array.length;

const deepFlatten = (array: Array<unknown>): Array<unknown> => [].concat(...array.map(item => (Array.isArray(item) ? deepFlatten(item) : item)));

/**
 * @argument array (Array): The array to inspect.
 * @argument [values] (...Array): The values to exclude.
 * @returns (Array): Returns the new array of filtered values.
 */

const diff = <T>(
  array: Array<T>, values: Array<T>
) => array.filter((item: T) => !new Set(values).has(item));

/**
 * @argument array (Array): The array to inspect.
 * @argument [values] (...Array): The values to exclude.
 * @argument [iteratee=_.identity] (Function): The iteratee invoked per element.
 * @returns (Array): Returns the new array of filtered values.
 */

const diffBy = <T>(
  array: T[],
  values: T[],
  iteratee: string
) => array.filter((v) => !values.some((u) => isEqual(v[iteratee], u[iteratee])));

/** 
 * @returns sorted by key in the array
 */

const sortBy = (array: Array<unknown>, key: string): Array<unknown> => array.sort((prev, next) => prev[key].localeCompare(next[key]));

export { hasDuplicates, deepFlatten, sortBy, diff, diffBy };
