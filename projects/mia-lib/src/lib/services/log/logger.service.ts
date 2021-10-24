import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ILogger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILogger {

  log(value: string): void {
    if (environment.production) {
      this.disabledProdMode();
    }
    console.log('%c LoggerService ➡ ', 'background-color: rgba(0, 0, 0, 0.15)', `${value}`);
  }

  warn(value: string): void {
    if (environment.production) {
      this.disabledProdMode();
    }
    console.warn(`LoggerService ➡ ${value}`);
  }

  error(value: string): void {
    if (environment.production) {
      this.disabledProdMode();
    }
    console.error(`LoggerService ➡ ${value}`);
  }

  private disabledProdMode(): void {
    let disFunc = () => 'Console has been disabled in production mode';

    console.log = disFunc;
    console.error = disFunc;
    console.warn = disFunc;
  }
}
