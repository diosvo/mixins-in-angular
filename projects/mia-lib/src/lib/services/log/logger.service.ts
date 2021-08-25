import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILogger {

  log(value: string): void {
    if (environment.production) {
      this.disabledProdMode();
    }
    console.log(`LoggerService: ${value}`);
  }

  info(value: string): void {
    if (environment.production) {
      this.disabledProdMode();
    }
    console.log(`LoggerService: ${value}`);
  }

  error(value: string): void {
    if (environment.production) {
      this.disabledProdMode();
    }
    console.log(`LoggerService: ${value}`);
  }

  private disabledProdMode(): void {
    let disFunc = () => 'Console has been disabled in production mode';

    console.log = disFunc;
    console.error = disFunc;
    console.warn = disFunc;

    Object.freeze(console);
  }
}
