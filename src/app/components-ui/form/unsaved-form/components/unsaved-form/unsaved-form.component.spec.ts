import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth/services/auth.service';
import { HasPermissionDirectiveModule } from '@auth/utils/has-permission.directive';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { ERole } from '@lib/models/role';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { of } from 'rxjs';
import { UnsavedFormComponent } from './unsaved-form.component';

describe('UnsavedFormComponent', () => {
  let component: UnsavedFormComponent;
  let fixture: ComponentFixture<UnsavedFormComponent>;

  const snackbar = {
    success: jest.fn(),
    error: jest.fn()
  };

  const route = ({
    data: of({ roles: [ERole.ADMIN] })
  }) as any;

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
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
            url: 'form/unsaved-form'
          }
        },
        {
          provide: SnackbarService,
          useValue: snackbar
        },
        {
          provide: AuthService,
          useValue: {
            user: {
              roles: [ERole.ADMIN, ERole.GUEST]
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsavedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('ngOnInit()', () => {
    jest.spyOn(component as any, 'formState');
    jest.spyOn(component as any, 'watchForChanges');

    component.ngOnInit();

    expect(component['formState']).toBeCalled();
    expect(component['watchForChanges']).toBeCalled();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('canDeactivate()', () => {
    test('returns true when there has NO changes or user does NOT have permission to update', () => {
      component.hasChanged = false;
      component['detectPermission'].hasPermission = false;
      expect(component.canDeactivate()).toBe(true);
    });

    test('returns false when there has changes or user has permission to update', () => {
      component.hasChanged = true;
      component['detectPermission'].hasPermission = true;
      expect(component.canDeactivate()).toBe(false);
    });
  });

  describe('saveChanges()', () => {
    afterEach(() => expect(component.hasChanged).toBe(false));

    test('show error message when form is invalid', () => {
      component.unsavedForm.setValue({ team_name: '' });
      component.saveChanges();
      expect(snackbar.error).toBeCalledWith('You need to provide all required information.');
    });

    describe('should save changes', () => {
      beforeEach(() => component.unsavedForm.setValue({ team_name: 'Dios Vo' }));

      test('should not navigate to somewhere else (user clicks on Save button)', () => {
        component.saveChanges();
        expect(snackbar.success).toBeCalledWith('Update successfully!');
        expect(component['router'].navigate).toBeCalledWith([component['router'].url]);
      });

      test('should navigate to another page if user wants to navigate away from the current page', () => {
        component.saveChanges('functions');
        expect(snackbar.success).toBeCalledWith('Update successfully!');
        expect(component['router'].navigate).toBeCalledWith(['functions']);
      });
    });
  });

  describe('formState()', () => {
    beforeEach(() => {
      jest.spyOn(component.unsavedForm, 'enable');
      jest.spyOn(component.unsavedForm, 'disable');
    });

    test('should enable form when user has permission', () => {
      component['detectPermission'].hasPermission = true;
      component['formState']();
      expect(component.unsavedForm.enable).toBeCalled();
    });

    test('should disable form when user does NOT have permission', () => {
      component['detectPermission'].hasPermission = false;
      component['formState']();
      expect(component.unsavedForm.disable).toBeCalled();
    });
  });
});
