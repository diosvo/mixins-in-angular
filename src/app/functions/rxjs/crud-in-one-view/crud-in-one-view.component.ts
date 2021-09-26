import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

interface Info {
  name: string;
  email: string;
}

const DEFAULT_VALUES = {
  name: '',
  email: ''
};

@Component({
  selector: 'app-crud-in-one-view',
  templateUrl: './crud-in-one-view.component.html',
  styleUrls: ['./crud-in-one-view.component.scss']
})
export class CrudInOneViewComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  })

  private readonly USER_STORAGE = 'user';
  readonly hasChanges$ = new Observable<boolean>();
  readonly user$ = new BehaviorSubject<Info>({} as Info);
  private destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  hasUser(): boolean {
    return JSON.stringify(this.user$.value) !== JSON.stringify({});
  }

  private watchForChanges(): void {

  }

  getUser(): void {
    const user = JSON.parse(localStorage.getItem(this.USER_STORAGE));
    if (!!user) {
      this.user$.next(user);
      this.form.patchValue(user);
    }
    return;
  }

  onCreate(): void {
    this.user$.next(DEFAULT_VALUES);
  }

  onSave(): void {
    this.user$.next(this.form.value);
    localStorage.setItem(this.USER_STORAGE, JSON.stringify(this.user$.value));
    this.snackbar.success('User has been saved.');
  }

  private clearStorage(): void {
    localStorage.removeItem(this.USER_STORAGE);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
