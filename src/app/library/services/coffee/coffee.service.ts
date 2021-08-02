import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICoffee } from '../../models/coffee';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService extends BaseService<ICoffee> {
  /*** return an observable from the service
   @api coffee.json
   */

  all$ = this.http.get<Array<ICoffee>>('/assets/backend/data/coffee.json');

  constructor(private http: HttpClient) {
    super();
  }

  /*** call methods from service
   @api coffee.json
   */

  all(): Observable<Array<ICoffee>> {
    return this.http
      .get<Array<ICoffee>>('/assets/backend/data/coffee.json');
  }
}
