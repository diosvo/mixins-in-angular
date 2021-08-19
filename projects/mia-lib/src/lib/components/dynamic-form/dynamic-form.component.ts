import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDynamicFormField } from './dynamic-form.model';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  encapsulation: ViewEncapsulation.None
})

export class DynamicFormComponent implements OnInit {
  dynamicForm: FormGroup = this.fb.group({});

  @Input() dynamicFormFields!: Array<IDynamicFormField>;
  @Output() submitForm = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dynamicFormFields.forEach(formItem => {
      const formControl = this.fb.control(formItem.value, formItem.validators);
      this.dynamicForm.addControl(formItem.id, formControl);
    });
  }
}
