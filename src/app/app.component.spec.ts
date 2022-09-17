import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth/services/auth.service';
import { FooterComponent } from '@home/components/footer/footer.component';
import { ToolbarComponent } from '@home/components/toolbar/toolbar.component';
import { ActivatedParamsService } from '@lib/services/activated-params/activated-params.service';
import { LoadingService } from '@lib/services/loading/loading.service';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let route: ActivatedParamsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        FooterComponent,
        ToolbarComponent,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: of(false)
          }
        },
        {
          provide: LoadingService,
          useValue: {
            loading$: of(false)
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    route = TestBed.inject(ActivatedParamsService);
    component = fixture.componentInstance;
  });

  test('should create the app', (() => {
    expect(component).toBeTruthy();
  }));

  describe('set up app', () => {
    beforeEach(() => {
      jest.spyOn(component.toolbar$, 'next');
      jest.spyOn(component.footer$, 'next');
    });

    it('should show toolbar and footer (for all components as default)', (done) => {
      component['route']['_data$'].next({ toolbar: undefined, footer: undefined });

      route.dataMap$.subscribe(() => {
        expect(component.toolbar$.next).toBeCalledWith(true);
        expect(component.footer$.next).toBeCalledWith(true);
        done();
      });
    });

    it('should hide toolbar and footer (eg: PNF)', (done) => {
      component['route']['_data$'].next({ toolbar: false, footer: false });

      route.dataMap$.subscribe(() => {
        expect(component.toolbar$.next).toBeCalledWith(false);
        expect(component.footer$.next).toBeCalledWith(false);
        done();
      });
    });
  });
});
