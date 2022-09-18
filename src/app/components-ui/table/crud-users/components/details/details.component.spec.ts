import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MOCK_USER } from '@lib/services/users/user.mock';
import { of } from 'rxjs';
import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;

  let mockDialogData: any = {
    user: MOCK_USER,
    isEdit: true
  };

  const mockDialogRef: any = {
    close: jest.fn()
  };

  const mockService: any = {
    form: new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      hobbies: new FormControl([])
    }),
    initializeValue$: jest.fn().mockReturnValue(of({})),
    loadFromApiAndFillForm$: jest.fn().mockReturnValue(of(MOCK_USER)),
    onFormChanges$: jest.fn().mockReturnValue(of(false))
  };

  beforeEach(() => {
    component = new DetailsComponent(mockDialogData, mockService, mockDialogRef);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit() to set up component after page load', () => {
    test('should map value when  the user clicks on Edit button', (done) => {
      component.ngOnInit();
      component.user$.subscribe(() => {
        expect(mockService.loadFromApiAndFillForm$).toBeCalledWith(mockDialogData.user);
        done();
      });
    });

    test('should get primitive value when the user clicks on Create button', (done) => {
      mockDialogData = {
        user: {},
        isEdit: false
      };
      component.ngOnInit();
      component.user$.subscribe(() => {
        expect(mockService.initializeValue$).toBeCalled();
        done();
      });
    });
  });

  describe('onSave()', () => {
    test('should set ok to be true when the user clicks on Save button', () => {
      component.onSave(true);
      expect(mockDialogRef.close).toBeCalledWith(true);
    });

    test('should set ok to false true when the user clicks on Cancel button', () => {
      component.onSave(false);
      expect(mockDialogRef.close).toBeCalledWith(false);
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
    component.hobbies.setValue(MOCK_USER.hobbies);
    jest.spyOn(component as any, 'hobbyValidator');
    jest.spyOn(component.hobbies, 'setValue');

    component.removeHobby(1);

    expect(component.hobbies.setValue).toBeCalledWith(['coding']);
    component.hobbies.value.forEach((item: string) => expect(component['hobbyValidator']).toBeCalledWith(item));
  });

  describe('hobbyValidator()', () => {
    beforeEach(() => {
      component.form.get('hobbies').setValue(MOCK_USER.hobbies);
      jest.spyOn(component.hobbies, 'setErrors');
    });

    test('returns duplicated error', () => {
      component.hobbies.setValue([...MOCK_USER.hobbies, 'coding']);
      component['hobbyValidator']('us');
      expect(component.hobbies.setErrors).toBeCalledWith({ duplicate: true });
    });

    test('returns invalid error', () => {
      component['hobbyValidator']('12');
      expect(component.hobbies.setErrors).toBeCalledWith({ invalid: true });
    });
  });
});
