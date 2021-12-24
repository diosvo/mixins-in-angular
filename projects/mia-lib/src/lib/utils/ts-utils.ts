/** 
 * @returns uncapitalize the keys of any object
 */

type UnCapitalizeKeys<T> = {
  [P in keyof T as `${Uncapitalize<string & P>}`]: T[P];
}

/** 
 * @returns new type - filter object-based types conditionally.
 */

type MarkUnwantedTypesAsNever<Source, Condition> = {
  [K in keyof Source]: Source[K] extends Condition ? K : never
}[keyof Source];

type FilterConditionally<Source, Condition> = Pick<Source, MarkUnwantedTypesAsNever<Source, Condition>>;

/** 
 * @description predicate combinator
 */

type PredicateFn = (value: unknown, index?: number) => boolean;
type ProjectionFn = (value: unknown, index?: number) => unknown;

function OR(...predicates: Array<PredicateFn>): PredicateFn {
  return (value) => predicates.some((predicate) => predicate(value));
}

function AND(...predicates: Array<PredicateFn>): PredicateFn {
  return (value) => predicates.every((predicate) => predicate(value));
}

function NOT(...predicates: Array<PredicateFn>): PredicateFn {
  return (value) => predicates.every((predicate) => predicate(value));
}

/*------ EXPORT HERE -----*/

export { };

