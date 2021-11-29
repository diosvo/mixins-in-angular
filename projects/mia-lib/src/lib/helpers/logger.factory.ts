import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class LoggerFactory {
  // should change the background and color based on type: component, service, interceptor, guard, so on....
  
  createLogger(name: string, color: string = '#2E5AAC'): Pick<Console, 'log'> {
    return {
      log: (message: Parameters<Console['log']>) => {
        if (!environment.production) {
          console.log(`%c[${name}]`, `background-color: #EEF2FA; color: ${color}`, `${message}`);
        }
        return;
      }
    };
  }
}
