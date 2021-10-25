import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ILogger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILogger {

  log(value: string): void {
    if (!environment.production) {
      console.log('%c Logger ', 'background-color: #EEF2FA; color: #2E5AAC', `${value}`);
    }
    return;
  }

  error(value: string): void {
    if (!environment.production) {
      console.error(`Logger - ${value}`);
    }
    return;
  }
}
