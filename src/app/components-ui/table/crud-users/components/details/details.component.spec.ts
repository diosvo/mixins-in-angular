import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInput } from '@lib/models/user';
import { DestroyService } from '@lib/services/destroy/destroy.service';
import { mockSnackbar } from '@lib/services/snackbar/snackbar.service.spec';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { DetailsComponent } from './details.component';

const id = 9 as const;

const user: UserInput = {
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
    valid: true,
    isEdit$: of(true),
    initializeValue$: jest.fn().mockReturnValue(of({})),
    loadFromApiAndFillForm$: jest.fn().mockReturnValue(of({ ...user, id })),
    save$: jest.fn().mockReturnValue(of(user)),
    onFormChanges$: jest.fn().mockReturnValue(of(false))
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
      afterEach(() => {
        expect(component.loading).toBe(false);
      });

      test('should get primitive value when we are landing on Create page', () => {
        component.ngOnInit();
        expect(mockService.initializeValue$).toBeCalled();
      });

      test('should map value when we are landing on Edit page', () => {
        mockRoute.params = of({ id });
        component.ngOnInit();
        expect(mockService.loadFromApiAndFillForm$).toBeCalledWith(id);
      });
    });

    test('should show error message when API returns error', () => {
      mockService.loadFromApiAndFillForm$.mockReturnValue(throwError(() => new Error('Bad Request')));
      jest.spyOn(component.errorMessage$, 'next');

      component.ngOnInit();
      expect(component.errorMessage$.next).toBeCalledWith('Bad Request');
    });
  });

  describe('enableSaveButton()', () => {
    test('returns false if there has not been changed', () => {
      component.hasChanged = false;
      expect(component.enableSaveButton()).toBe(false);
    });

    test('returns false if form is invalid', () => {
      mockService.valid = () => false;
      expect(component.enableSaveButton()).toBe(false);
    });

    test('returns false if loading indicator is visible', () => {
      component.saving = true;
      expect(component.enableSaveButton()).toBe(false);
    });

    test('returns true if there has changed, form is valid and loading indicator is invisible', () => {
      component.hasChanged = true;
      expect(component.enableSaveButton()).toBe(true);
    });
  });

  describe('canDeactivate()', () => {
    test('returns true if enableSaveButton() is false', () => {
      component.enableSaveButton = () => false;
      expect(component.canDeactivate()).toBe(true);
    });

    test('returns false if disableButton() is true', () => {
      component.enableSaveButton = () => true;
      expect(component.canDeactivate()).toBe(false);
    });
  });

  describe('saveChanges()', () => {
    describe('when API returns success', () => {
      afterEach(() => {
        expect(component.saving).toBe(false);
        expect(mockRouter.navigate).toBeCalledWith(['components/table/crud-users']);
      });

      test('should save changes on the Create page', () => {
        mockService.isEdit$ = new BehaviorSubject(false);
        component.saveChanges();
        expect(mockSnackbar.success).toBeCalledWith('The user has been created.');
      });

      test('should save changes on the Edit page', () => {
        mockService.isEdit$ = new BehaviorSubject(true);
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

  describe('addHobby()', () => {
    beforeEach(() => {
      jest.spyOn(component.hobbies, 'setValue');
      jest.spyOn(component as any, 'hobbyValidator');
    });

    test('should not add new value if no value is passed in', () => {
      const event = {
        value: '',
        chipInput: {
          clear: jest.fn()
        }
      } as any;
      component.addHobby(event);

      expect(event.chipInput.clear).toBeCalled();
      expect(component['hobbyValidator']).toBeCalledWith(event.value);
    });

    test('should add new value if value is passed in', () => {
      const event = {
        value: 'football',
        chipInput: {
          clear: jest.fn()
        }
      } as any;
      component.addHobby(event);

      expect(component.hobbies.setValue).toBeCalledWith([event.value]);
      expect(event.chipInput.clear).toBeCalled();
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

  describe('hobbyValidator()', () => {
    beforeEach(() => jest.spyOn(component.hobbies, 'setErrors'));

    test('returns duplicated error', () => {
      component.hobbies.setValue([...user.hobbies, 'us']);
      component['hobbyValidator']('us');
      expect(component.hobbies.setErrors).toBeCalledWith({ duplicate: true });
    });

    test('returns invalid error', () => {
      component.hobbies.setValue(user.hobbies);
      component['hobbyValidator']('12');
      expect(component.hobbies.setErrors).toBeCalledWith({ invalid: true });
    });
  });

  describe('watchForFormChanges()', () => {
    test('returns false if there has not been changed', () => {
      component['watchForFormChanges']();
      expect(component.hasChanged).toBe(false);
    });

    test('returns true if there has changed', () => {
      mockService.onFormChanges$.mockReturnValue(of(true));
      component['watchForFormChanges']();
      expect(component.hasChanged).toBe(true);
    });
  });
});
