import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
* @description check property pattern
*/

class Regex {
  static Text = /^[a-zA-Z ]*$/;
}

/**
* @description check validations
* step 1 - create in file TS: matcher = new ErrorMatcher();
* step 2 - add in Input: [errorStateMatcher]="matcher"
*/

class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
* for @password
*/

function matchPassword(controlA: string, controlB: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const valueOfControlA = formGroup.get(controlA).value;
    const valueOfControlB = formGroup.get(controlB).value;

    return valueOfControlA === valueOfControlB ? null : { passwordsDoNotMach: true };
  };
}


/**
* for @cardNumber
* @description based on Luhn algorithm
*/

function isCardNumberValid(cardNumber: string): boolean {
  const { length } = cardNumber;
  const array = cardNumber.split('').map((char, idx) => {
    const digit = parseInt(char, 10);

    if ((idx + length) % 2 === 0) {
      const digitX2 = digit * 2;
      return digitX2 > 9 ? digitX2 - 9 : digitX2;
    }

    return digit;
  });

  return !(array.reduce((prev, next) => prev + next, 0) % 10);
}

export { ErrorMatcher, Regex, matchPassword, isCardNumberValid };
