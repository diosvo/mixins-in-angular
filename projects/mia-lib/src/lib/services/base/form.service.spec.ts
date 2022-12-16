import { fakeAsync, flush, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MOCK_USER_ID } from '@lib/mocks/json-placeholder/user.mock';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AbstractFormService } from './form.service';

type User = Record<string, string>;

const user: User = {
  firstName: 'Dios',
  lastName: 'Vo'
};

class Form extends AbstractFormService<User> {

  primary_key = 'id';
  isEdit$ = new BehaviorSubject<boolean>(false);
  primitiveValue$ = new BehaviorSubject<User>(user);

  buildForm(): FormGroup {
    return;
  }

  initializeValue$(): Observable<User> {
    return of(user);
  }

  loadFromApiAndFillForm$(): Observable<User> {
    return of(user);
  }

  protected create$(): Observable<User> {
    return of(user);
  }

  protected update$(id = MOCK_USER_ID.toString()): Observable<User> {
    return of({ id, ...user });
  }
}

describe('AbstractFormService', () => {
  let service: Form;

  beforeEach(() => {
    service = new Form(new FormBuilder());
    service.form = new FormGroup({
      lastName: new FormControl(user.lastName, [Validators.required]),
      firstName: new FormControl(user.firstName, [Validators.required])
    });
  });

  test('should initialize service', () => {
    expect(service).toBeTruthy();
  });

  describe('get valid()', () => {
    test('returns false if the form is pristine', () => {
      expect(service.valid).toBe(false);
    });

    test('should check valid form', () => {
      service.form.markAsDirty();

      service.form.patchValue({ lastName: '' });
      expect(service.valid).toBe(false);

      service.form.patchValue({ lastName: 'V' });
      expect(service.valid).toBe(true);
    });
  });

  test('should get form value', () => {
    service.form.patchValue(user);
    expect(service.getFormValue()).toEqual(user);
  });

  describe('setFormValue()', () => {
    beforeEach(() => {
      jest.spyOn(service.form, 'reset');
    });

    test('should reset form with default values when no data is passed in', () => {
      service.setFormValue();
      expect(service.form.reset).toBeCalled();
    });

    test('should reset form passed value', () => {
      service.setFormValue(user);
      expect(service.form.reset).toBeCalledWith(user);
    });
  });

  describe('onFormChanges$', () => {
    test('returns true if there has changes', fakeAsync(() => {
      service.onFormChanges$([]).subscribe(() => {
        service.form.patchValue({ lastName: 'V' });
        tick();
      });
      // TODO: update 2 cases
      service.form.valueChanges.subscribe(console.log);
      flush();
    }));
  });

  describe('save$()', () => {
    test('should call update$ function when isEdit$ value is true', (done) => {
      service.isEdit$.next(true);
      service.save$().subscribe((response: User) => {
        expect(response).toEqual({ id: MOCK_USER_ID.toString(), ...user });
        done();
      });
    });

    test('should call create$ function when isEdit$ value is false', (done) => {
      service.isEdit$.next(false);
      service.save$().subscribe((response: User) => {
        expect(response).toEqual(user);
        done();
      });
    });
  });
});
