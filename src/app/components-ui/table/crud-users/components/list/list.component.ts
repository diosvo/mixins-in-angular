import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { DEFAULT_STATE, HttpRequestState, initialValues } from '@lib/models/server.model';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { UserDetailsService } from '@lib/services/users/user-details.service';
import { User } from '@lib/services/users/user-service.model';
import { UsersService } from '@lib/services/users/users.service';
import { BehaviorSubject, catchError, filter, map, Observable, of, shareReplay, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'list-users',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  private refresh$ = new BehaviorSubject<HttpRequestState<User>>(DEFAULT_STATE);
  state$: Observable<HttpRequestState<User>>;

  query = new FormControl('');

  columns: TableColumn[] = [
    { key: 'id', flex: '10%' },
    { key: 'name', flex: '20%' },
    { key: 'email', flex: '20%' },
    { key: 'phone', flex: '20%' },
    { key: 'actions', flex: '15%', truncate: false },
  ];

  constructor(
    private readonly dialog: MatDialog,
    private readonly service: UsersService,
    private readonly snackbar: SnackbarService,
    private readonly details: UserDetailsService,
  ) { }

  ngOnInit(): void {
    this.state$ = this.refresh$.pipe(
      switchMap(() =>
        this.service.all().pipe(
          map((data: User[]) => ({ data, loading: false })),
          catchError(({ message }) => of({ message, loading: false })),
          initialValues(),
          shareReplay(1),
        )
      ),
    ) as Observable<HttpRequestState<User>>;
  }

  openConfirmDialog(user: User): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          header: 'Delete',
          body: `Are you sure you want to delete ${user.name}?`,
          btnClose: false
        },
        width: '500px',
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((ok: boolean) => ok),
        take(1)
      )
      .subscribe({
        next: () => this.onDelete(user)
      });
  }

  private onDelete(user: User): void {
    this.details.remove$(user.id)
      .pipe(
        tap(() => this.refresh$.next({ loading: true, data: null })),
        take(1)
      )
      .subscribe({
        next: () => this.snackbar.success(`${user.name} has been deleted.`),
        error: ({ message }) => this.snackbar.error(message)
      });
  }
}
