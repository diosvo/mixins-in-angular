import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { DetailsComponent } from './details.component';

const user = {
  name: 'Dios',
  email: 'vtmn1212@gmail.com',
  hobbies: ['us', 'you']
};

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      imports: [
        CustomInputModule,

        ReactiveFormsModule,
        BrowserAnimationsModule,

        MatChipsModule,
        MatFormFieldModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.spyOn(component, 'ngOnDestroy');
    fixture.destroy();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('ngOnChanges() to watch the values change', () => {
    const changes = {
      user: {
        currentValue: user
      }
    } as any;
    jest.spyOn(component.form, 'patchValue');

    component.ngOnChanges(changes);
    expect(component.form.patchValue).toBeCalledWith(changes.user.currentValue);
  });

  test('watchForFormChanged()', fakeAsync(() => {
    jest.spyOn(component.changed, 'emit');
    jest.spyOn(component.isValid, 'emit');

    component['watchForFormChanged']();
    component.form.patchValue(user);
    tick(100);

    component.form.valueChanges.subscribe(response => {
      expect(component.changed.emit).toBeCalledWith(response);
      expect(component.isValid.emit).toBeCalledWith(component.form.valid);
    });
  }));

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
});
