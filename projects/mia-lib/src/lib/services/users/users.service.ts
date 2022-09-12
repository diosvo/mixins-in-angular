import { Injectable } from '@angular/core';
import { State } from '@lib/models/server.model';
import isEqual from 'lodash.isequal';
import { catchError, map, of, startWith } from 'rxjs';
import { StateService } from '../base/state.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { UserDetailsService } from './user-details.service';
import { INITIAL_USER_STATE, User } from './user-service.model';

@Injectable()
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

  onDelete(user: User): void {
    this.setState({ loading: true });

    this.service.remove$(user.id).subscribe({
      next: () => {
        this.snackbar.success('The selected user has been deleted');
        this.setState({
          data: this.state.data.filter((selected: User) => !isEqual(selected.id, user.id)),
          loading: false
        });
      },
      error: ({ message }) => this.snackbar.error(message)
    });
  }

  onSave(edit: boolean): void {
    this.setState({ loading: true });

    this.service[edit ? 'update$' : 'create$']().subscribe({
      next: (user: User) => {
        this.setState({
          data: edit
            ? this.state.data.map((item: User) => isEqual(user.id, item.id) ? { ...item, ...user } : item)
            : this.state.data.concat(user),
          loading: false
        });
        this.snackbar.success(`The user has been ${edit ? 'updated' : 'created'} `);
      },
      error: ({ message }) => this.snackbar.error(message)
    });
  }
}
