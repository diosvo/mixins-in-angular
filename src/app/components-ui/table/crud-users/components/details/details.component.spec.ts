import { fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { mockSnackbar } from '@lib/services/snackbar/snackbar.service.spec';
import { of, throwError } from 'rxjs';
import { DetailsComponent } from './details.component';

const id = 9 as const;

const user = {
  name: 'Dios',
  email: 'vtmn1212@gmail.com',
  hobbies: ['us', 'you']
};

describe('DetailsComponent', () => {
  let component: DetailsComponent;

  const mockRouter: any = {
    navigate: jest.fn()
  };

  const mockService: any = {
    form: new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      hobbies: new FormControl([])
    }),
    initializeValue$: jest.fn().mockReturnValue(of({})),
    loadFromApiAndFillForm$: jest.fn().mockReturnValue(of({ ...user, id })),
    save$: jest.fn().mockReturnValue(of(user))
  };

  const mockRoute: any = {
    params: of({})
  };

  beforeEach(() => {
    component = new DetailsComponent(mockRouter, mockService, mockRoute, new DestroyService(), mockSnackbar);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit() to set up component after page load', () => {
    beforeEach(() => {
      jest.spyOn(component as any, 'watchForFormChanges');
    });

    afterEach(() => {
      expect(component['watchForFormChanges']).toBeCalled();
    });

    describe('when no errors occur', () => {
      beforeEach(() => {
        jest.spyOn(component['primitiveValue$'], 'next');
      });

      afterEach(() => {
        expect(component.loading).toBe(false);
      });

      test('should get primitive value when we are landing on Create page', () => {
        component.ngOnInit();
        expect(component['primitiveValue$'].next).toBeCalledWith({});
      });

      test('should map value when we are landing on Edit page', () => {
        mockRoute.params = of({ id });
        component.ngOnInit();
        expect(component['primitiveValue$'].next).toBeCalledWith({ ...user, id });
      });
    });

    test('should show error message when API returns error', () => {
      mockService.loadFromApiAndFillForm$.mockReturnValue(throwError(() => new Error('Bad Request')));
      jest.spyOn(component.errorMessage$, 'next');

      component.ngOnInit();
      expect(component.errorMessage$.next).toBeCalledWith('Bad Request');
    });
  });

  describe('disableButton() to disable Save button, in cases:', () => {
    test('when there has not been changed', () => {
      component.hasChanged = false;
      expect(component.disableButton()).toBe(true);
    });

    test('when the form is invalid', () => {
      component.service.form.setValue({
        ...user,
        name: ''
      });
      component.hasChanged = true;
      expect(component.disableButton()).toBe(true);
    });

    test('when saving data', () => {
      component.service.form.setValue(user);
      component.hasChanged = true;
      component.saving = true;
      expect(component.disableButton()).toBe(true);
    });
  });

  describe('canDeactivate()', () => {
    test('returns true if disableButton() is true', () => {
      component.disableButton = () => true;
      expect(component.canDeactivate()).toBe(true);
    });

    test('returns false if disableButton() is false', () => {
      component.disableButton = () => false;
      expect(component.canDeactivate()).toBe(false);
    });
  });

  describe('saveChanges()', () => {
    describe('when API returns success', () => {
      beforeEach(() => {
        jest.spyOn(component['primitiveValue$'], 'next');
      });

      afterEach(() => {
        expect(component.saving).toBe(false);
        expect(component['primitiveValue$'].next).toBeCalledWith(mockService.form.value);
        expect(mockRouter.navigate).toBeCalledWith(['components/table/crud-users']);
      });

      test('should save changes on the Create page', () => {
        component.saveChanges();
        expect(mockSnackbar.success).toBeCalledWith('The user has been created.');
      });

      test('should save changes on the Edit page', () => {
        mockService.form.addControl('id', new FormControl(id));
        component.saveChanges();
        expect(mockSnackbar.success).toBeCalledWith('The user has been updated.');
      });
    });

    test('should throw error message when API returns error', () => {
      mockService.save$.mockReturnValue(throwError(() => new Error('Bad Request')));
      component.saveChanges();
      expect(mockSnackbar.error).toBeCalledWith('Bad Request');
    });
  });

  describe('addHobby() when the user enters', () => {
    beforeEach(() => {
      jest.spyOn(component.hobbies, 'setValue');
      jest.spyOn(component as any, 'hobbyValidator');
    });

    test('empty chip', () => {
      const event = {
        value: '',
        chipInput: {
          clear: jest.fn()
        }
      } as any;
      component.addHobby(event);

      expect(event.chipInput.clear).toHaveBeenCalled();
      expect(component['hobbyValidator']).toHaveBeenCalled();
    });

    test('new chip', () => {
      const event = {
        value: 'football',
        chipInput: {
          clear: jest.fn()
        }
      } as any;
      component.addHobby(event);

      expect(component.hobbies.setValue).toBeCalledWith([event.value]);
      expect(event.chipInput.clear).toHaveBeenCalled();
      expect(component['hobbyValidator']).toBeCalledWith(event.value);
    });
  });

  test('removeHobby()', () => {
    component.hobbies.setValue(user.hobbies);
    jest.spyOn(component as any, 'hobbyValidator');
    jest.spyOn(component.hobbies, 'setValue');

    component.removeHobby(0);

    expect(component.hobbies.setValue).toBeCalledWith(['you']);
    component.hobbies.value.forEach((item: string) => expect(component['hobbyValidator']).toBeCalledWith(item));
  });

  describe('hobbyValidator() to check hobby when it is', () => {
    beforeEach(() => jest.spyOn(component.hobbies, 'setErrors'));

    test('duplicated', () => {
      component.hobbies.setValue([...user.hobbies, 'us']);
      component['hobbyValidator']('us');
      expect(component.hobbies.setErrors).toBeCalledWith({ duplicate: true });
    });

    test('invalid', () => {
      component.hobbies.setValue(user.hobbies);
      component['hobbyValidator']('12');
      expect(component.hobbies.setErrors).toBeCalledWith({ invalid: true });
    });
  });

  describe('watchForFormChanges()', () => {
    test('returns false if there has not been changed', fakeAsync(() => {
      component['primitiveValue$'].next(user);

      component['watchForFormChanges']();
      mockService.form.setValue(user);
      tick();

      expect(component.hasChanged).toBe(false);
    }));

    test('returns true if there has changed', fakeAsync(() => {
      component['primitiveValue$'].next(user);

      component['watchForFormChanges']();
      mockService.form.setValue({
        ...user,
        name: 'dios'
      });
      tick();

      expect(component.hasChanged).toBe(true);
    }));
  });
});
