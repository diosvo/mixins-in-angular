import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeactivateComponent } from '@lib/models/base-form-component';
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
    team_name: new FormControl('Dios', Validators.required)
  })

  // Can multi keys are difference from Form => need to filter same key
  primitiveValue = { 'team_name': 'Dios' }

  ngOnInit(): void {
    this.watchForChanges();
  }

  private watchForChanges(): void {
    const formChanges$ =
      combineLatest([of(this.primitiveValue), this.unsavedForm.valueChanges]).pipe(
        map(([prev, next]) => JSON.stringify(prev) === JSON.stringify(next)),
        startWith(true)
      );

    formChanges$.subscribe(response => this.hasChanges = response);
  }

  canDeactivate(): boolean {
    return !this.unsavedForm.valid || this.isFormSubmitted || this.hasChanges;
  }

  saveBeforeDeactivate(): void {
    return this.onSubmit();
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    alert('Update Successfully');
  }
}
