import { Injectable } from '@angular/core';
import { State } from '@lib/models/server.model';
import isEqual from 'lodash.isequal';
import { catchError, map, of, startWith } from 'rxjs';
import { StateService } from '../base/state.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { UserDetailsService } from './user-details.service';
import { INITIAL_USER_STATE, User } from './user-service.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends StateService<User> {

  readonly users_state$ = this.select((state) => state);

  constructor(
    private readonly snackbar: SnackbarService,
    private readonly service: UserDetailsService,
  ) {
    super(INITIAL_USER_STATE);
  }

  loadState(): void {
    this.service.all$()
      .pipe(
        map((data: User[]) => ({ data, loading: false })),
        catchError(({ message }) => of({ data: [], error: message, loading: false })),
        startWith(INITIAL_USER_STATE)
      )
      .subscribe({
        next: (state: State<User>) => this.setState(state)
      });
  }

  executeJob(action: 'update$' | 'create$' | 'remove$', id: number): void {
    this.setState({ loading: true });
    const job = (user: User) => {
      switch (action) {
        case 'update$':
          return this.state.data.map((item: User) => isEqual(item.id, id) ? { ...item, ...user } : item);
        case 'create$':
          return this.state.data.concat(user);
        case 'remove$':
          return this.state.data.filter((selected: User) => !isEqual(selected.id, id));
      }
    };

    this.service[action](id).subscribe({
      next: (user: User) => {
        this.setState({
          data: job(user),
          loading: false
        });
        this.snackbar.success(`The user has been ${action.replace('$', 'd')}`);
      },
      error: ({ message }) => {
        this.setState({
          loading: false
        });
        this.snackbar.error(message);
      }
    });
  }
}
