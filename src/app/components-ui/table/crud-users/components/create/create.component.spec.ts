import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDetailsService } from '@lib/services/users/user-details.service';
import { of, throwError } from 'rxjs';
import { DetailsModule } from '../details/details.module';
import { CreateComponent } from './create.component';

const user = {
  name: 'Dios Vo',
  email: 'vtmn1212@gmail.com',
  hobbies: ['coding', 'basketball']
};

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  const service = {
    create: jest.fn().mockReturnValue(of(user))
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {
            path: 'ui-components/table/crud-users',
            component: CreateComponent
          }
        ]),
        BrowserAnimationsModule,

        DetailsModule,

        MatButtonModule,
        MatSnackBarModule,
        MatProgressBarModule
      ],
      providers: [
        {
          provide: UserDetailsService,
          useValue: service
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('onFormChanged() to get values when form changed', () => {
    component.onFormChanged(user);
    expect(component.user).toEqual(user);
  });

  describe('onCreate() when the API returns', () => {
    test('success', () => {
      jest.spyOn(component['router'], 'navigate');

      component.onCreate();

      expect(service.create).toBeCalled();
      expect(component['router'].navigate).toHaveBeenCalledWith(['ui-components/table/crud-users']);
    });

    test('failed', () => {
      jest.spyOn(component['snackbar'], 'error');
      service.create.mockReturnValue(throwError(() => new Error('ERROR_MESSAGE')));

      component.onCreate();

      expect(service.create).toBeCalled();
      expect(component['snackbar'].error).toBeCalledWith('ERROR_MESSAGE');
    });
  });
});
