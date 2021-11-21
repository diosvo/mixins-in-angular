import { LoggerService } from '@lib/services/log/logger.service';

/**
 * @description define the params type that can be passed to our decorator
 */

interface SafeDecoratorParams<T> {
  logLevel?: SafeDecoratorLogLevel;
  returnValue?: T;
}

/**
 * @description represents the available Logging level
 */

enum SafeDecoratorLogLevel {
  Default, Console
}

export function Safe<T>(params: SafeDecoratorParams<T> = {}): Function {
  return (
    target: object,
    propertyKey: string,
    loggerService: LoggerService,
    descriptor: TypedPropertyDescriptor<Function>
  ): TypedPropertyDescriptor<Function> => {
    const originalMethod = descriptor.value; // first cache the original method implementation
    const currentLogLevel = params.logLevel || SafeDecoratorLogLevel.Default;

    /**
     * @description when there is an error caught
     * Choose to make a console message or custom error handler
     */

    descriptor.value = function SafeWrapper(): SafeDecoratorParams<T> | false {
      try { } catch (error) {
        if (currentLogLevel === SafeDecoratorLogLevel.Console) {
          loggerService.error(error);
        }

        if (currentLogLevel === SafeDecoratorLogLevel.Default) {
          // custom error handler
        }

        return params.returnValue || false;
      }
    };

    return descriptor;
  };
}