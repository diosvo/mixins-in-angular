import { enableProdMode, Injectable, isDevMode } from '@angular/core';
import { environment } from '@env/environment';
import { ILogger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILogger {

  log(value: string): void {
    if (!environment.production) {
      console.log(`LoggerService: ${value}`);
    }
    return;
  }

  info(value: string): void {
    if (!environment.production) {
      console.info(`LoggerService: ${value}`);
    }
    return;
  }

  error(value: string): void {
    if (!environment.production) {
      console.error(`LoggerService: ${value}`);
    }
    return;
  }

  private disabledProdMode(): void {
    enableProdMode();
    let disFunc = () => 'Console has been disabled in production mode';

    console.log = disFunc;
    console.error = disFunc;
    console.warn = disFunc;

    Object.freeze(console);
  }
}
