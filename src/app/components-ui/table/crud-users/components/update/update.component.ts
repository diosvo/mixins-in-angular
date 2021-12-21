import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DeactivateComponent } from '@lib/models/base-form-component';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { UserDetailsService } from '@lib/services/users/user-details.service';
import { User } from '@lib/services/users/user-service.model';
import { combineLatest, filter, finalize, map, Observable, startWith, Subject, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'update-user',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy, DeactivateComponent {
  user_id: number;
  user$: Observable<User>;
  user = new FormControl({});

  isValid = true;
  saving = false;
  hasChanged = false;

  destroyed$ = new Subject<boolean>();
  readonly loading$: Observable<boolean> = this.service.loading$;

  constructor(
    private readonly router: Router,
    private readonly snackbar: SnackbarService,
    private readonly service: UserDetailsService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.service.currentUser$.pipe(
      filter(data => data !== null),
      tap(({ id }) => this.user_id = id as number)
    );
    this.watchForFormChanged();
  }

  private watchForFormChanged(): void {
    combineLatest([
      this.user$.pipe(map(({ name, email, hobbies }) => ({ name, email, hobbies }))),
      this.user.valueChanges
    ])
      .pipe(
        map(([prev, next]) => JSON.stringify(prev) !== JSON.stringify(next)),
        startWith(false),
        takeUntil(this.destroyed$)
      )
      .subscribe((changed: boolean) => this.hasChanged = changed);
  }

  onFormChanged(data: User): void {
    this.user.setValue(data);
  }

  canDeactivate(): boolean {
    return !this.hasChanged;
  }

  saveChanges(url?: string): void {
    this.saving = true;
    this.service.update({ id: this.user_id, ...this.user.value })
      .pipe(
        take(1),
        finalize(() => this.saving = false)
      )
      .subscribe({
        next: () => this.snackbar.success('The user has been updated.'),
        error: ({ message }) => this.snackbar.error(message),
        complete: () => this.router.navigate([url ?? this.router.url])
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
