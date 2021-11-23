/** 
 * @description create a utility type that receives an object type
 * @returns all its properties which have a value that isn't a function
 */

// Step 1: mark all the functions by setting their value to never type
// Loop over the component type's keys. If the type of the value extends the Function type -> change it to never
// Otherwise, set it to be the key name

type MarkFunctionProperties<Component> = {
  [Key in keyof Component]: Component[Key] extends Function ? never : Key;
}

// Step 2: leverage the keyof operator to create a new type, 
// Which yields the type of permitted property names for T
// All the non-function holding keys

type ExcludeFunctionPropertyName<T> = MarkFunctionProperties<T>[keyof T];

// Step 3: extract these properties from our component

type ExcludeFunction<T> = Pick<T, ExcludeFunctionPropertyName<T>>;

// Step 4: create our desired interface, which loop over the keys and return a typed version of SimpleChanges

export type NgChanges<Component, Properties = ExcludeFunction<Component>> = {
  [Key in keyof Properties]: {
    previousValue: Properties[Key];
    currentValue: Properties[Key];
    firstChange: boolean;
    isFirstChange(): boolean;
  }
}