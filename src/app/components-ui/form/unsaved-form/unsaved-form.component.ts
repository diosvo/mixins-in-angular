import { CommonModule } from '@angular/common';
import { Component, OnInit, Self } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HasPermissionDirective, LogicalOperator } from '@auth/utils/has-permission.directive';
import { AlertComponent } from '@lib/components/alert/alert.component';
import { ButtonLoaderIconDirective } from '@lib/components/custom-button/button-loader-icon.directive';
import { CustomButtonComponent } from '@lib/components/custom-button/custom-button.component';
import { CustomInputComponent } from '@lib/components/custom-input/custom-input.component';
import { DeactivateComponent } from '@lib/guards/unsaved-changes.guard';
import { ERole } from '@lib/models/role';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { DetectPermissionService } from '@lib/services/detect-permission/detect-permission.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import isEqual from 'lodash.isequal';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unsaved-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    AlertComponent,
    CustomInputComponent,
    CustomButtonComponent,
    HasPermissionDirective,
    ButtonLoaderIconDirective,
  ],
  templateUrl: './unsaved-form.component.html',
  providers: [DetectPermissionService],
})

export class UnsavedFormComponent implements OnInit, DeactivateComponent {

  hasChanged = false;
  private vm$ = new BehaviorSubject<string>('Dios');
  name = new FormControl({ value: 'Dios', disabled: !this.detectPermission.hasPermission }, Validators.required);

  readonly permission = ERole;
  readonly operator = LogicalOperator;

  constructor(
    private readonly router: Router,
    private readonly destroy$: DestroyService,
    private readonly snackbar: SnackbarService,
    @Self() readonly detectPermission: DetectPermissionService,
  ) { }

  ngOnInit(): void {
    this.watchForChanges();
  }

  private watchForChanges(): void {
    combineLatest([this.vm$.asObservable(), this.name.valueChanges])
      .pipe(
        map(([prev, next]) => !isEqual(prev, next)),
        startWith(false),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (changed: boolean) => this.hasChanged = changed
      });
  }

  canDeactivate(): boolean {
    return !this.hasChanged || !this.detectPermission.hasPermission;
  }

  saveChanges(url?: string): void {
    this.vm$.next(this.name.value);
    this.snackbar.success('Update successfully!');
    this.router.navigate([url ?? this.router.url]);
  }
}
