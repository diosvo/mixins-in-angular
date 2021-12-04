import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

enum Type {
  DEFAULT = 'background-color: #EEF2FA; color: #2E5AAC', // blue
  SERVICE = 'background-color: #FFF4EC; color: #B95000', // yellow
  AUTH = 'background-color: #EDF9F0; color: #287D3C' //green
}

export type LogType = 'default' | 'service' | 'auth';

@Injectable({
  providedIn: 'root'
})

export class LoggerFactory {
  /**
   * @description choose a type to determine which scope are being used, we can see the logs easier with logs colour
   * @type default (blue), for: components
   * @type service (yellow), for: services
   * @type auth (green), for:  interceptor, guard,
   */

  createLogger(name: string, type: LogType = 'default'): Pick<Console, 'log'> {
    return {
      log: (message: Parameters<Console['log']>) => {
        if (!environment.production) {
          switch (type) {
            case 'default': {
              console.log(`%c[${name}]`, Type.DEFAULT, `${message}`);
              break;
            }
            case 'service': {
              console.log(`%c[${name}]`, Type.SERVICE, `${message}`);
              break;
            }
            case 'auth': {
              console.log(`%c[${name}]`, Type.AUTH, `${message}`);
              break;
            }
            default:
              console.log(`%c[${name}]`, Type.DEFAULT, `${message}`);
              break;
          }
        }
        return;
      }
    };
  }
}
