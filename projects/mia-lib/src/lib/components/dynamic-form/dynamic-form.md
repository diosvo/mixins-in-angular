## How to use?

> ### **Firstly** - we have the model

```
id: string; // object keys
label: string;
type: 'text' | 'select';
value: string; // object values
placeholder: string;
validators: Array<ValidatorFn>;
selectOptions: { value: option };
```

_Properties_:

- **id, label, type** (text or select) are required. 

- Just only add `selectOptions` property when type is **select**

> ### **Implement** - step by step below:

step 1: import `DynamicFormModule` into the module contains component using it

step 2: add to component.html `<dynamic-form [dynamicFormFields]="dynamicFormFields" (submitForm)="onSubmit($event)"></dynamic-form>`

step 3: add to component.ts

* Note : we don't need to declare form group or anything else!

```
dynamicFormFields = [
  {
    id: 'name',
    label: 'Input Form',
    type: 'text',
    value: 'Dios Vo',
    validators: [Validators.required, Validators.email]
  },
  {
    id: 'item',
    label: 'Select Form',
    type: 'select',
    placeholder: 'Choose...',
    selectOptions: {
      1: 'Item 1',
      2: 'Item 2',
      3: 'Item 3'
    },
    value: '2', // it means the dropdown will select option 'Item 2'
    validators: [Validators.required]
  }
];

onSubmit($event): void {
  // $event: contains form value - corresponding to dynamicFormFields has been defined above
  // eg:

  {
    name: 'Dios Vo'
    item: 2
  }

  // handle form after submitting
}
```