import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeactivateComponent } from '@lib/models/base-form-component';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { combineLatest, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-unsaved-form',
  templateUrl: './unsaved-form.component.html'
})
export class UnsavedFormComponent implements OnInit, DeactivateComponent {

  hasChanges = false;
  isFormSubmitted = false;

  unsavedForm = new FormGroup({
    team_name: new FormControl('Dios', Validators.required),
  })
  primitiveValue = of({
    team_name: 'Dios',
    team_id: 1
  });

  constructor(
    private snackbar: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.watchForChanges();
  }

  private watchForChanges(): void {
    // Deep-compare between Primitive Form Value & Form Value Changes 
    const formChanges$ = combineLatest([this.primitiveValue, this.unsavedForm.valueChanges])
      .pipe(
        map(([prev, next]) => JSON.stringify(prev) === JSON.stringify(next)),
        startWith(true)
      );

    formChanges$.subscribe(response => this.hasChanges = response);
  }

  canDeactivate(): boolean {
    return !this.unsavedForm.valid || this.hasChanges || this.isFormSubmitted;
  }

  saveBeforeDeactivate(): void {
    return this.onSubmit();
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    this.snackbar.success('Update successfully!');
  }
}
