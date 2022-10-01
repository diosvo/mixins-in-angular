import isEqual from 'lodash.isequal';

/**
 * @argument array (Array): The array to inspect.
 * @returns (boolean) Returns true if value is duplicated, else false.
 */

const hasDuplicates = <T>(array: T[]): boolean => !isEqual(new Set(array).size, array.length);

/**
 * @argument array (Array): The array to inspect.
 * @argument [values] (...Array): The values to exclude.
 * @returns (Array): Returns the new array of filtered values.
 */

const diff = <T>(array: T[], values: T[]): T[] => array.filter((item: T) => !new Set(values).has(item));

/**
 * @argument array (Array): The array to inspect.
 * @argument [values] (...Array): The values to exclude.
 * @argument [_.identity] (string): The `_.property` iteratee shorthand.
 * @returns (Array): Returns the new array of filtered values.
 */

const diffBy = <T>(array: T[], values: T[], _identity: string): T[] =>
  array.filter((v: T) => !values.some((u: T) => isEqual(v[_identity], u[_identity])));

/**
 * @argument array (Array): The array to inspect.
 * @argument [values] (...Array): The values to combine.
 * @returns (Array): Returns the new array of combined values.
*/

const union = <T>(array: T[], values: T[]): T[] => diff(array, values).concat(values);

/**
 * @argument array (Array): The array to inspect.
 * @argument [values] (...Array): The values to combine.
 * @argument [_.identity] (string): The `_.property` iteratee shorthand.
 * @returns (Array): Returns the new array of combined values.
*/

const unionBy = <T>(array: T[], values: T[], _identity: string): T[] => diffBy(array, values, _identity).concat(values);

export { hasDuplicates, diff, diffBy, union, unionBy };

