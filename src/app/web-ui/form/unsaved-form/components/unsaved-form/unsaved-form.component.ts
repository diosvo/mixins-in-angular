import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeactivateComponent } from '@lib/models/base-form-component';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { combineLatest, of } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { EUrl } from 'src/app/home/models/url.enum';

@Component({
  selector: 'app-unsaved-form',
  templateUrl: './unsaved-form.component.html'
})
export class UnsavedFormComponent implements OnInit, DeactivateComponent {

  hasChanges = false;
  isFormSubmitted = false;

  unsavedForm = new FormGroup({
    team_name: new FormControl('Dios', Validators.required)
  })
  primitiveValue = of(this.unsavedForm.value).pipe(first());

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
    this.router.navigate([EUrl.WEB]);
  }
}
