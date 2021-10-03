import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@lib/components/confirm-dialog/confirm-dialog.component';
import { DeactivateComponent } from '@lib/models/base-form-component';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

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
export class CrudInOneViewComponent implements OnInit, OnDestroy, DeactivateComponent {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  })

  private readonly USER_STORAGE = 'user';
  readonly user$ = new BehaviorSubject<Info>({} as Info);

  hasChanged = false;
  private destroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = JSON.parse(localStorage.getItem(this.USER_STORAGE));
    if (!!user) {
      this.user$.next(user);
      this.watchForChanges();
      this.form.patchValue(user);
    }
    return;
  }

  hasUser(): boolean {
    return JSON.stringify(this.user$.value) !== JSON.stringify({});
  }

  createMode(): boolean {
    return JSON.stringify(this.user$.value) === JSON.stringify(DEFAULT_VALUES);
  }

  onCreate(): void {
    this.user$.next(DEFAULT_VALUES);
  }

  onReset(): void {
    this.form.patchValue(this.user$.value);
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Warning',
        body: 'Your data will be lost. Are you sure?',
        btnConfirm: 'Delete',
      },
      disableClose: true,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((response: boolean) => {
      if (!!response) {
        this.clearStorage();
        this.form.reset();
        this.user$.next({} as Info);
        this.snackbar.success('User has been deleted.');
      }
    });
  }

  isReadyToSave(): boolean {
    if (this.createMode()) {
      return this.form.valid;
    } else {
      return this.form.valid && this.hasChanged;
    }
  }

  saveChanges(url?: string): void {
    localStorage.setItem(this.USER_STORAGE, JSON.stringify(this.form.value));
    this.user$.next(this.form.value);
    this.watchForChanges();    
    this.snackbar.success('User has been saved.');
    this.router.navigate([url ?? this.router.url]);
  }

  canDeactivate(): boolean {        
    if(this.hasUser()) {
      return !this.hasChanged;
    } else {
      return true;
    }
  };

  private watchForChanges(): void {
    combineLatest([this.user$, this.form.valueChanges])
      .pipe(
        map(([prev, next]) => JSON.stringify(prev) !== JSON.stringify(next)),
        startWith(false),
        takeUntil(this.destroy$)
      )
      .subscribe(response => this.hasChanged = response);
  }

  private clearStorage(): void {
    localStorage.removeItem(this.USER_STORAGE);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
