import { Injectable } from '@angular/core';
import { State } from '@lib/models/server.model';
import { BulkAction, EAction } from '@lib/models/table';
import { diffBy } from '@lib/utils/array-utils';
import isEqual from 'lodash.isequal';
import { catchError, forkJoin, map, of, startWith } from 'rxjs';
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

  adjust(action: BulkAction, id: number): void {
    this.setState({ loading: true });
    const job = (user: User) => {
      switch (action) {
        case EAction.UPDATE:
          return this.state.data.map((item: User) => isEqual(item.id, id) ? { ...item, ...user } : item);
        case EAction.CREATE:
          const ids = this.state.data.length > 0 ? this.state.data.map(({ id }) => id) : [0];
          return this.state.data.concat({
            ...user,
            id: Math.max(...ids) + 1
          });
      }
    };

    this.service[`${action}$`]().subscribe({
      next: (user: User) => {
        this.setState({
          data: job(user),
          loading: false
        });
        this.snackbar.success(`The user has been ${action.concat('d')}`);
      },
      error: ({ message }) => {
        this.setState({
          loading: false
        });
        this.snackbar.error(message);
      }
    });
  }

  delete(users: User[]): void {
    this.setState({ loading: true });
    const selection$ = users.map(({ id }) => this.service.remove$(id));

    forkJoin(selection$).subscribe({
      next: () => {
        this.setState({
          data: diffBy(this.state.data, users, 'id'),
          loading: false
        });
        this.snackbar.success(
          users.length > 1
            ? 'The selected users have been deleted'
            : 'The user has been deleted'
        );
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
