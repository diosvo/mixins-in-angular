import { ValidatorFn } from '@angular/forms';

interface BaseDynamicFormField {
  id: string;
  label: string;
  type: 'text' | 'select';
}

interface IDynamicFormField extends BaseDynamicFormField {
  value?: string;
  placeholder?: string;
  validators?: Array<ValidatorFn>;
  selectOptions?: { [key: string]: string | number };
}

export { IDynamicFormField };

