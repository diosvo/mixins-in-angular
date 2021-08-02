import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ILogger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILogger {

  log(value: string): void {
    if (environment.production) {
      return console.log(`LogService: ${value}`);
    }
    return;
  }

  info(value: string): void {
    if (environment.production) {
      return console.info(`LogService: ${value}`);
    }
    return;
  }

  error(value: string): void {
    if (environment.production) {
    return console.error(`LogService: ${value}`);
    }
    return;
  }
}
