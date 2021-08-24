import { enableProdMode, Injectable, isDevMode } from '@angular/core';
import { ILogger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILogger {

  log(value: string): void {
    if (isDevMode()) {
      return console.log(`LoggerService: ${value}`);
    }
    this.disabledProdMode();
  }

  info(value: string): void {
    if (isDevMode()) {
      return console.log(`LoggerService: ${value}`);
    }
    this.disabledProdMode();
  }

  error(value: string): void {
    if (isDevMode()) {
      return console.log(`LoggerService: ${value}`);
    }
    this.disabledProdMode();
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
