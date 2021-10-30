import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@lib/models/user';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { UsersService } from '@lib/services/users/users.service';
import { Observable, pluck, Subject, switchMap, takeUntil } from 'rxjs';

type User = Partial<IUser>;

@Component({
  selector: 'update-user',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  destroy$ = new Subject<void>();

  user_id: number;
  user = new FormControl({ name: '', email: '' });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UsersService,
    private readonly snackbar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.route.params.pipe(
      pluck('user_id'),
      switchMap(id => {
        this.user_id = id;
        return this.userService.byId(id);
      }),
      takeUntil(this.destroy$)
    )
  }

  onFormChanged(data: { name: string, email: string }): void {
    this.user.setValue(data);
  }

  onUpdate(): void {
    this.userService.update({ id: this.user_id, ...this.user.value }).subscribe({
      next: () => this.snackbar.success('The user has been updated.'),
      error: ({ message }) => this.snackbar.success(message),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
