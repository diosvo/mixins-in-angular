/**
 * @usageNote `@Input()` Required name: string;
 * @description it only affects with `@Input()` is not set or does not use default value.
 * @description if the user does not provide property name, the browser will throw an error message.
 */

export const Required = (target: unknown, propertyKey: string): void => {
  Object.defineProperty(target, propertyKey, {
    get() {
      throw new Error(`Attribute ${propertyKey} is required!`);
    },
    set(value) {
      Object.defineProperty(target, propertyKey, {
        value,
        writable: true,
        configurable: true,
      });
    },
    configurable: true,
  });
};
