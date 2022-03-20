import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { TableColumn } from '@lib/components/custom-table/custom-table.component';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { User } from '@lib/services/users/user-service.model';
import { UsersService } from '@lib/services/users/users.service';
import { catchError, filter, finalize, map, Observable, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'list-users',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  users$: Observable<Array<User>>;

  loading = false;
  errorMessage$ = new Subject<string>();

  columns: Array<TableColumn> = [
    { key: 'id', flex: '10%' },
    { key: 'name', flex: '20%' },
    { key: 'email', flex: '20%' },
    { key: 'phone', flex: '20%' },
    { key: 'actions', flex: '15%' },
  ];

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackbar: SnackbarService,
    private readonly userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.loading = true;

    this.users$ = this.userService.all().pipe(
      finalize(() => this.loading = false),
      catchError(({ message }) => {
        this.errorMessage$.next(message);
        return of(message);
      })
    );
  }

  openConfirmDialog(user: User, index: number): void {
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
