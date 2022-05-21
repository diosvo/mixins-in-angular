import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

enum Background {
  DEFAULT = 'background-color: #EEF2FA; color: #2E5AAC', // blue
  SERVICE = 'background-color: #FFF4EC; color: #B95000', // yellow
  AUTH = 'background-color: #EDF9F0; color: #287D3C' //green
}

enum ELog {
  DEFAULT = 'default',
  SERVICE = 'service',
  AUTH = 'auth'
}

type TLog = `${Lowercase<ELog>}`;

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

  createLogger(name: string, type: TLog = ELog.DEFAULT): Pick<Console, 'log'> {
    return {
      log: (message: Parameters<Console['log']>) => {
        if (!environment.production) {
          switch (type) {
            case ELog.DEFAULT: {
              this.log(name, Background.DEFAULT, message);
              break;
            }
            case ELog.SERVICE: {
              this.log(name, Background.SERVICE, message);
              break;
            }
            case ELog.AUTH: {
              this.log(name, Background.AUTH, message);
              break;
            }
          }
        }
        return;
      }
    };
  }

  private log(name: string, type: Background, message: Parameters<Console['log']>): void {
    console.log(`%c[${name}]`, type, `${message}`);
  }
}
