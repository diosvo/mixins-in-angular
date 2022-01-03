import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomInputComponent } from './custom-input.component';

describe('CustomInputComponent', () => {
  let component: CustomInputComponent;
  let fixture: ComponentFixture<CustomInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CustomInputComponent],
      imports: [
        FormsModule,
        MatInputModule,
        MatFormFieldModule,

        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('writeValue() when value is', () => {
    test('defined', () => {
      component.writeValue('test' as 'string');
      expect(component['_value']).toBe('test');
    });

    test('undefined', () => {
      component.writeValue(undefined);
      expect(component['_value']).toBeUndefined();
    });
  });

  describe('setDisabledState() when disabled option is', () => {
    test('true', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);
    });

    test('false', () => {
      component.setDisabledState(false);
      expect(component.disabled).toBe(false);
    });
  });
});
