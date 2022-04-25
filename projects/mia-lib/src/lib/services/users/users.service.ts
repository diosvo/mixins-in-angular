import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { BaseService } from '../base/base.service';
import { HandleService } from '../base/handle.service';
import { User } from './user-service.model';

@Injectable()

export class UsersService extends BaseService<User> {

  private endpoint = environment.jsonPlaceHolderUrl + 'users';

  constructor(
    protected readonly http: HttpClient,
    protected readonly handle: HandleService
  ) {
    super(http, handle);
  }

  all(): Observable<User[]> {
    return this.list(this.endpoint);
  }

  lookup(data: Observable<User[]>, imported: Observable<number[]>): Observable<User[]> {
    return imported.pipe(
      startWith([]),
      switchMap((ids: number[]) =>
        data.pipe(
          map((data: User[]) =>
            data.filter((item: User) => ids.includes(item.id as number))
          )
        )
      )
    );
  }
}
