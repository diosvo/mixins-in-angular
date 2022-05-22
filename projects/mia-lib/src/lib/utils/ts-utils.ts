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

