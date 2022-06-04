/**
 * @usageNote `@Input()` Required name: string;
 * @description it only affects with `@Input()` has primitive type (does not set/ use default value).
 * @returns if the user does not provide property name, the browser will throw an error message.
 */

export const Required = (target: unknown, propertyKey: string): void => {
  Object.defineProperty(target, propertyKey, {
    get(): never {
      throw new Error(`Attribute ${propertyKey} is required!`);
    },
    set(value): void {
      Object.defineProperty(target, propertyKey, {
        value,
        writable: true,
        configurable: true,
      });
    },
    configurable: true,
  });
};
