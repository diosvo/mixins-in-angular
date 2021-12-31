import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth/services/auth.service';
import { FooterModule } from '@home/components/footer/footer.module';
import { ToolbarModule } from '@home/components/toolbar/toolbar.module';
import { ActivatedParamsService } from '@lib/services/activated-params/activated-params.service';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        FooterModule,
        ToolbarModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: Title,
          useValue: {
            setTitle: jest.fn().mockReturnValue('App')
          }
        },
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: of(true)
          }
        },
        {
          provide: ActivatedParamsService,
          useValue: {
            dataMap$: of({ title: 'Page Not Found', toolbar: false, footer: false })
          }
        },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  test('should create the app', (() => {
    expect(component).toBeTruthy();
  }));

  describe('set up app', () => {
    beforeEach(() => {
      jest.spyOn(component.showToolbar$, 'next');
      jest.spyOn(component.showFooter$, 'next');
    });

    it('should show toolbar and footer (for all components as default)', () => {
      /*  component['route']['_data$'].next({ title: 'App', toolbar: undefined, footer: undefined });
       component['route'].dataMap$.subscribe(() => {
         expect(component['titleService'].setTitle).toBeCalledWith('App');
         expect(component.showToolbar$.next).toBeCalledWith(true);
         expect(component.showFooter$.next).toBeCalledWith(true);
       }); */
    });

    it('should hide toolbar and footer (eg: PNF)', () => {
      component['route'].dataMap$.subscribe(() => {
        expect(component['titleService'].setTitle).toBeCalledWith('Page Not Found');
        expect(component.showToolbar$.next).toBeCalledWith(false);
        expect(component.showFooter$.next).toBeCalledWith(false);
      });
    });
  });
});
