import { ChangeDetectionStrategy, Component, OnInit, Self } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeactivateComponent } from '@lib/models/base-form-component';
import { DetectPermissionService } from '@lib/services/detect-permission/detect-permission.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { combineLatest, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EUrl } from 'src/app/home/models/url.enum';

@Component({
  selector: 'app-unsaved-form',
  templateUrl: './unsaved-form.component.html',
  providers: [DetectPermissionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UnsavedFormComponent implements OnInit, DeactivateComponent {

  hasChanged = false;
  isFormSubmitted = false;

  unsavedForm: FormGroup = this.fb.group({
    team_name: ['Dios', Validators.required],
  })
  primitiveValue = of({
    team_name: 'Dios',
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    @Self() private detectPermission: DetectPermissionService,
  ) { }

  ngOnInit(): void {
    this.formState();
    this.watchForChanges();
  }

  private watchForChanges(): void {
    // Deep-compare between Primitive Form Value & Form Value Changes 
    combineLatest([this.primitiveValue, this.unsavedForm.valueChanges])
      .pipe(
        map(([prev, next]) => JSON.stringify(prev) === JSON.stringify(next)),
        startWith(true)
      )
      .subscribe(response => this.hasChanged = response);
  }

  canDeactivate(): boolean {
    return this.hasChanged || this.isFormSubmitted || !this.detectPermission.hasPermission;
  }

  saveChanges(url: string): void {
    return this.onSubmit(url);
  }

  onSubmit(url: string): void {
    if (this.unsavedForm.invalid) {
      this.snackbar.error('You need to provide all required information.');
      return;
    }
    this.isFormSubmitted = true;
    this.snackbar.success('Update successfully!');
    this.router.navigate([url ?? EUrl.COMPONENT]);
  }

  private formState(): void {
    this.detectPermission.hasPermission ? this.unsavedForm.enable() : this.unsavedForm.disable();
  }
}
