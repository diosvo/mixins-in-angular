import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth/services/auth.service';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { ERole } from '@lib/models/role';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { mockSnackbar } from '@lib/services/snackbar/snackbar.service.spec';
import { of } from 'rxjs';
import { UnsavedFormComponent } from './unsaved-form.component';

describe('UnsavedFormComponent', () => {
  let component: UnsavedFormComponent;
  let fixture: ComponentFixture<UnsavedFormComponent>;

  const route = ({
    data: of({ roles: [ERole.ADMIN] })
  }) as any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UnsavedFormComponent],
      imports: [
        AlertModule,
        CustomInputModule,

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
          useValue: mockSnackbar
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

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('ngOnInit()', () => {
    jest.spyOn(component as any, 'watchForChanges');
    component.ngOnInit();
    expect(component['watchForChanges']).toBeCalled();
  });


  describe('canDeactivate()', () => {
    test('returns true when there has not been changed or user does NOT have permission to update', () => {
      component.hasChanged = false;
      component['detectPermission'].hasPermission = false;
      expect(component.canDeactivate()).toBe(true);
    });

    test('returns false when there has changed or user has permission to update', () => {
      component.hasChanged = true;
      component['detectPermission'].hasPermission = true;
      expect(component.canDeactivate()).toBe(false);
    });
  });

  describe('saveChanges()', () => {
    ;
    describe('should save changes', () => {
      beforeEach(() => {
        component.name.setValue('Dios Vo');
        jest.spyOn(component['vm$'], 'next');
      });

      afterEach(() => {
        expect(component['vm$'].next).toBeCalledWith('Dios Vo');
      });

      test('should not navigate to somewhere else (user clicks on Save button)', () => {
        component.saveChanges();
        expect(mockSnackbar.success).toBeCalledWith('Update successfully!');
        expect(component['router'].navigate).toBeCalledWith([component['router'].url]);
      });

      test('should navigate to another page if user wants to navigate away from the current page', () => {
        component.saveChanges('functions');
        expect(mockSnackbar.success).toBeCalledWith('Update successfully!');
        expect(component['router'].navigate).toBeCalledWith(['functions']);
      });
    });
  });
});
