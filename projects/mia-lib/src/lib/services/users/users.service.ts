import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { User, users_endpoint, user_id_endpoint } from './user-service.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  all(): Observable<Array<User>> {
    return this.http.get<Array<Required<User>>>(users_endpoint).pipe(
      shareReplay(1)
    );
  }

  delete(id: number): Observable<User> {
    return this.http.delete<Required<User>>(user_id_endpoint(id));
  }
}
