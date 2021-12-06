import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@auth/services/auth.service';
import { CustomButtonModule } from '@lib/components/custom-button/custom-button.module';
import { CustomInputModule } from '@lib/components/custom-input/custom-input.module';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';

const snackbar = {
  success: jest.fn(),
  error: jest.fn()
};

const login_values = {
  username: 'diosvo',
  password: '123456'
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const service = {
    login: jest.fn().mockReturnValue(of(login_values))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CustomInputModule,
        CustomButtonModule,

        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        MatDialogModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: service
        },
        {
          provide: SnackbarService,
          useValue: snackbar
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit() to login and the API returns', () => {
    test('success', () => {
      component.onSubmit();
      expect(snackbar.success).toBeCalledWith('Login successfully!');
    });

    test('error', () => {
      service.login.mockReturnValue(throwError(() => new Error('Something went wrong. Please try again!')));
      component.onSubmit();
      expect(snackbar.error).toBeCalledWith('Something went wrong. Please try again!');
    });
  });
});
