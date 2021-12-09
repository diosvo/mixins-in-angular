import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SnackbarService } from '@lib/services/snackbar/snackbar.service';
import { User, UsersService } from '@lib/services/users/users.service';
import { combineLatest, of, throwError } from 'rxjs';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { DetailsModule } from '../details/details.module';
import { UpdateComponent } from './update.component';

const user: User = {
  id: 1,
  name: 'Dios',
  email: 'vtmn1212@gmail.com',
  hobbies: ['basketball']
};

const snackbar = {
  success: jest.fn(),
  error: jest.fn()
};

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;

  const service = {
    currentUser$: of(user),
    update: jest.fn().mockReturnValue(of(user))
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateComponent],
      imports: [
        DetailsModule,
        BreadcrumbsModule,

        MatButtonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,

        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: UsersService,
          useValue: service
        },
        {
          provide: SnackbarService,
          useValue: snackbar
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.spyOn(component, 'ngOnDestroy');
    fixture.destroy();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('setup component', () => {
    jest.spyOn(component as any, 'watchForFormChanged');
    component.ngOnInit();

    component.user$.subscribe((response: User) => {
      expect(response).toEqual(user);
      expect(component.user_id).toBe(response.id);
    });
    expect(component['watchForFormChanged']).toBeCalled();
  });

  describe('watchForFormChanged() to detect changes, in case:', () => {
    beforeEach(() => {
      component.user$ = service.currentUser$;
      component.user.setValue(user);
    });

    test('values changed', fakeAsync(() => {
      component['watchForFormChanged']();
      component.user.setValue({ ...user, hobbies: ['coding'] });
      tick();
      fixture.detectChanges();

      combineLatest([component.user$, component.user.valueChanges]).subscribe(response => {
        expect(response).toBe(true);
        expect(component.hasChanged).toBe(true);
      });
    }));

    test('values did NOT changed', fakeAsync(() => {
      component['watchForFormChanged']();
      tick();
      fixture.detectChanges();

      combineLatest([component.user$, component.user.valueChanges]).subscribe(response => {
        expect(response).toBe(false);
        expect(component.hasChanged).toBe(false);
      });
    }));
  });

  test('watchForFormChanged() to emit value changed', () => {
    component.user$ = service.currentUser$;
    component.user.setValue(user);
  });

  test('onFormChanged() to set new values when form changed', () => {
    jest.spyOn(component.user, 'setValue');
    component.onFormChanged(user);
    expect(component.user.setValue).toBeCalledWith(user);
  });

  describe('canDeactivate() when there has', () => {
    test('changes', () => {
      component.hasChanged = true;
      expect(component.canDeactivate()).toBe(false);
    });

    test('NO changes', () => {
      component.hasChanged = false;
      expect(component.canDeactivate()).toBe(true);
    });
  });

  describe('saveChanges() when API returns', () => {
    beforeEach(() => jest.spyOn(component['router'], 'navigate'));

    test('succeed (pressing on Save button on the current page)', () => {
      component.saveChanges();
      expect(service.update).toBeCalled();
      expect(snackbar.success).toBeCalledWith('The user has been updated.');
    });

    test('succeed (pressing on Save changes button on unsaved dialog)', () => {
      component.saveChanges('ui-components');

      expect(service.update).toBeCalled();
      expect(component['router'].navigate).toBeCalledWith(['ui-components']);
      expect(snackbar.success).toBeCalledWith('The user has been updated.');
    });

    test('failure', () => {
      service.update.mockReturnValue(throwError(() => new Error('Bad Request')));

      component.saveChanges();

      expect(service.update).toBeCalled();
      expect(snackbar.error).toBeCalledWith('Bad Request');
    });
  });
});
