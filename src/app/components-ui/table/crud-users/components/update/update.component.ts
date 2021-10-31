import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DeactivateComponent } from '@lib/models/base-form-component';
import { IUser } from '@lib/models/user';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { UsersService } from '@lib/services/users/users.service';
import { combineLatest, map, Observable, startWith, Subject, takeUntil, tap } from 'rxjs';

type User = Partial<IUser>;

@Component({
  selector: 'update-user',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy, DeactivateComponent {
  user_id: number;
  user$: Observable<User>;
  user = new FormControl({ name: '', email: '' });

  isValid = true;
  isSubmitted = false;

  saving = false;
  hasChanged = false;

  destroy$ = new Subject<boolean>();
  loading$: Observable<boolean> = this.userService.loading$;

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
      this.user$.pipe(map(({ name, email }) => ({ name, email }))),
      this.user.valueChanges
    ])
      .pipe(
        map(([prev, next]) => JSON.stringify(prev) !== JSON.stringify(next)),
        startWith(false)
      )
      .subscribe((changed: boolean) => this.hasChanged = changed);
  }

  onFormChanged(data: { name: string, email: string }): void {
    this.user.setValue(data);
  }

  canDeactivate(): boolean {
    return !this.hasChanged || this.isSubmitted;
  }

  saveChanges(url?: string): void {
    if (!this.isValid) {
      this.snackbar.error('You need to provide all required fields.');
      return;
    }

    this.saving = true;
    this.userService.update({ id: this.user_id, ...this.user.value }).subscribe({
      next: () => this.snackbar.success('The user has been updated.'),
      error: ({ message }) => this.snackbar.error(message),
      complete: () => {        
        this.saving = false;
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
