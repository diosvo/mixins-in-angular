### Usage Notes

1. import `ControlErrorsDirective` to detect control's errors and `ControlErrorContainerDirective` to get all controls in form group
2. add `controlErrorContainer` (once time) into any control

eg:

```
<form [formGroup]="fgName">
  <custom-input label="Name" formControlName="name"></custom-input>
  <custom-input
    label="Email"
    type="email"
    controlErrorContainer
    formControlName="email"
  ></custom-input>
</form>
```

### References

| Links                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------- |
| [Error with animation](https://stackblitz.com/edit/angular-qrluoz-yfsabk)                                               |
| [Advanced error handling](https://medium.com/fundamental-library/advanced-error-handling-in-angular-forms-1b1a7fe1ec88) |

⏱️ Latest update: Sun 27 Nov 2022
