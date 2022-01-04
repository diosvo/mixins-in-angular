import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay } from 'rxjs';
import { HandleService } from '../base/handle.service';
import { User, users_endpoint, user_id_endpoint } from './user-service.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(
    private readonly http: HttpClient,
    private readonly handle: HandleService
  ) { }

  all(): Observable<Array<User>> {
    return this.http.get<Array<Required<User>>>(users_endpoint).pipe(
      shareReplay(1),
      catchError(this.handle.errorHandler(`${this.constructor.name}: all`))
    );
  }

  delete(id: number): Observable<User> {
    return this.http.delete<Required<User>>(user_id_endpoint(id)).pipe(
      catchError(this.handle.errorHandler(`${this.constructor.name}: delete`))
    );
  }
}
