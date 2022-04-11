import { Component, OnInit, Self } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeactivateComponent } from '@lib/guards/unsaved-changes.guard';
import { DetectPermissionService } from '@lib/services/detect-permission/detect-permission.service';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { combineLatest, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-unsaved-form',
  templateUrl: './unsaved-form.component.html',
  providers: [DetectPermissionService],
})

export class UnsavedFormComponent implements OnInit, DeactivateComponent {

  hasChanged = false;

  unsavedForm: FormGroup = this.fb.group({
    team_name: ['Dios', Validators.required],
  });
  primitiveValue = of({
    team_name: 'Dios',
  });

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly snackbar: SnackbarService,
    @Self() readonly detectPermission: DetectPermissionService,
  ) { }
  isAllowed: boolean;

  ngOnInit(): void {
    this.formState();
    this.watchForChanges();
  }

  private watchForChanges(): void {
    // Deep-compare between Primitive Form Value & Form Value Changes
    combineLatest([this.primitiveValue, this.unsavedForm.valueChanges])
      .pipe(
        map(([prev, next]) => JSON.stringify(prev) !== JSON.stringify(next)),
        startWith(false)
      )
      .subscribe(response => this.hasChanged = response);
  }

  canDeactivate(): boolean {
    return !this.hasChanged || !this.detectPermission.hasPermission;
  }

  saveChanges(url?: string): void {
    this.hasChanged = false;
    this.snackbar.success('Update successfully!');
    this.router.navigate([url ?? this.router.url]);
  }

  private formState(): void {
    this.detectPermission.hasPermission ? this.unsavedForm.enable() : this.unsavedForm.disable();
  }
}
