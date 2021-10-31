import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DeactivateComponent } from '@lib/models/base-form-component';
import { IUser } from '@lib/models/user';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { UsersService } from '@lib/services/users/users.service';
import { combineLatest, first, map, Observable, startWith, Subject, takeUntil, tap } from 'rxjs';

type User = Partial<IUser>;

@Component({
  selector: 'update-user',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy, DeactivateComponent {
  user$: Observable<User>;
  destroy$ = new Subject<boolean>();
  user = new FormControl({ name: '', email: '' });

  user_id: number;
  isValid = true;
  saving = false;
  hasChanged = false;

  constructor(
    private readonly router: Router,
    private readonly userService: UsersService,
    private readonly snackbar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.userService.currentUser$.pipe(
      tap(({ id }) => this.user_id = id as number),
      takeUntil(this.destroy$)
    );
    this.watchForFormChanged();
  }

  private watchForFormChanged(): void {
    combineLatest([
      this.user$.pipe(map(({ name, email }) => ({ name, email })), first()),
      this.user.valueChanges
    ])
      .pipe(
        map(([prev, next]) => JSON.stringify(prev) !== JSON.stringify(next)),
        startWith(false)
      )
      .subscribe(response => this.hasChanged = response);
  }

  onFormChanged(data: { name: string, email: string }): void {
    this.user.setValue(data);
  }

  canDeactivate(): boolean {
    return !this.hasChanged;
  }

  saveChanges(url?: string): void {
    this.saving = true;
    this.userService.update({ id: this.user_id, ...this.user.value }).subscribe({
      next: () => this.snackbar.success('The user has been updated.'),
      error: ({ message }) => this.snackbar.error(message),
      complete: () => {
        this.saving = false;
        this.hasChanged = false;
        this.router.navigate([url ?? this.router.url]);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
