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

/*------ EXPORT HERE -----*/

export { };

