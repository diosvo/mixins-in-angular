import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeactivateComponent } from '@lib/models/base-form-component';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { combineLatest, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EUrl } from 'src/app/home/models/url.enum';

@Component({
  selector: 'app-unsaved-form',
  templateUrl: './unsaved-form.component.html'
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

    formChanges$.subscribe(response => this.hasChanged = response);
  }

  canDeactivate(): boolean {
    return this.hasChanged || this.isFormSubmitted;
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
}
