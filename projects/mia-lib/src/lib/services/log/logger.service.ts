import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILogger {

  log(value: string): void {
    if (environment.apiUrl) {
      return console.log(`LoggerService: ${value}`);
    }
    return;
  }

  info(value: string): void {
    if (environment.apiUrl) {
      return console.log(`LoggerService: ${value}`);
    }
    return;
  }

  error(value: string): void {
    if (environment.apiUrl) {
      return console.log(`LoggerService: ${value}`);
    }
    return;
  }
}
