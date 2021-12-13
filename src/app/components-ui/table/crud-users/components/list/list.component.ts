import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { User, UsersService } from '@lib/services/users/users.service';
import { BehaviorSubject, catchError, filter, finalize, map, Observable, Subject, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'list-users',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  users$: Observable<Array<User>>;
  refreshUsers$ = new BehaviorSubject<boolean>(true);

  loading = false;
  errorMessage$ = new Subject<string>();

  columns: Array<TableColumn> = [
    { key: 'id' },
    { key: 'name' },
    { key: 'email' },
    { key: 'actions', disableSorting: true },
  ];

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackbar: SnackbarService,
    private readonly userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.all().pipe(
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return throwError(() => new Error(message));
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

    this.userService.delete(user.id as number)
      .pipe(
        switchMap(() => this.users$ = this.users$.pipe(
          map((data: Array<User>) => data.filter(item => item.id !== user.id))
        )),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: () => this.snackbar.success(`${user.name} has been deleted.`),
        error: ({ message }) => this.snackbar.error(message)
      });
  }
}
