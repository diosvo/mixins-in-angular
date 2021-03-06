import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { UserDetailsService } from '@lib/services/users/user-details.service';
import { User } from '@lib/services/users/user-service.model';
import { UsersService } from '@lib/services/users/users.service';
import isEqual from 'lodash.isequal';
import { catchError, filter, finalize, map, Observable, of, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'list-users',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  users$: Observable<User[]>;

  loading = true;
  query = new FormControl('');
  errorMessage$ = new Subject<string>();

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
    this.users$ = this.service.all().pipe(
      tap(() => this.loading = false),
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return of(message);
      })
    );
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
      .pipe(filter(result => result))
      .subscribe(() => this.delete(user));
  }

  private delete(user: User): void {
    this.loading = true;

    this.details.remove$(user.id)
      .pipe(
        switchMap(() => this.users$ = this.users$.pipe(
          map((data: User[]) => data.filter(item => !isEqual(item.id, user.id)))
        )),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: () => this.snackbar.success(`${user.name} has been deleted.`),
        error: ({ message }) => this.snackbar.error(message)
      });
  }
}
