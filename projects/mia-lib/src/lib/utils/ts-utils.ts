/** 
 * @returns uncapitalize the keys of any object
 */

type UnCapitalizeKeys<T> = {
  [P in keyof T as `${Uncapitalize<string & P>}`]: T[P];
}