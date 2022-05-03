import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { BaseService } from '../base/base.service';
import { HandleService } from '../base/handle.service';
import { endpoint, User } from './user-service.model';

@Injectable()

export class UsersService extends BaseService<User> {

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: HandleService
  ) {
    super(http, handle);
  }

  all(): Observable<User[]> {
    return this.list(endpoint);
  }

  lookup(data: Observable<User[]>, inclusion: Observable<number[]>): Observable<User[]> {
    return inclusion.pipe(
      startWith([]),
      switchMap((ids: number[]) =>
        data.pipe(
          map((data: User[]) => data.filter((item: User) => ids.includes(item.id)))
        )
      )
    );
  }
}
