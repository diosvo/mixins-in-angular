// 1. Mapped Types: go through all keys of the object. If's an object, call the type again
// 2. Conditional Types: concat the previous key to the path

/** 
 * @returns nested keys suggestion
 */

// @ts-ignore
export type NestedKeyOf<O extends object> = { [Key in keyof O & (string | number)]: O[Key] extends object ? `${Key}.${NestedKeyOf<O[Key]>}` : Key }[keyof O & (string | number)];
