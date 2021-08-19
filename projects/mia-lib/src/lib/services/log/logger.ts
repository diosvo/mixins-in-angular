import { InjectionToken } from '@angular/core';

interface ILogger {
  log: (value: string) => void;
  info: (value: string) => void;
  error: (value: string) => void;
}

const LOGGER = new InjectionToken<ILogger>('logger', {
  factory: () => ({
    log: (value: string) => console.log(`Default ${value}`),
    info: (value: string) => console.info(`Default ${value}`),
    error: (value: string) => console.error(`Default ${value}`)
  })
});

export { ILogger, LOGGER };
