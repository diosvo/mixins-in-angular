import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HasPermissionDirectiveModule } from '@auth/utils/has-permission.directive';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { UnsavedFormComponent } from './unsaved-form.component';

describe('UnsavedFormComponent', () => {
  let component: UnsavedFormComponent;
  let fixture: ComponentFixture<UnsavedFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnsavedFormComponent],
      imports: [
        AlertModule,
        CustomInputModule,
        HasPermissionDirectiveModule,

        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,

        MatButtonModule,
        MatSnackBarModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsavedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  /*   describe('redirectAfterSaving()', () => {
      beforeEach(() => jest.spyOn(component['router'], 'navigate'));
  
      test('when user navigates to another page', () => {
        component['redirectAfterSaving']('functions');
        expect(component['router'].navigate).toBeCalledWith(['functions']);
      });
    }); 

  describe('formState()', () => {
    beforeEach(() => {
      jest.spyOn(component.unsavedForm, 'enable');
      jest.spyOn(component.unsavedForm, 'disable');
    });

    test('should disable form when user does NOT have permission', () => {
      component['detectPermission'].hasPermission = false;
      component['formState']();
      expect(component.unsavedForm.disable).toBeCalled();
    });
  });
  */
});
