import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let mockRoute;

  const mockAuthService: any = {
    isLoggedIn$: of(false)
  };


  beforeEach(() => {
    mockRoute = {
      dataMap$: of({ toolbar: true, footer: true })
    };

    component = new AppComponent(mockAuthService, mockRoute);
  });

  test('should create the app', (() => {
    expect(component).toBeTruthy();
  }));

  describe.skip('set up app', () => {
    beforeEach(() => {
      jest.spyOn(component.toolbar$, 'next');
      jest.spyOn(component.footer$, 'next');
    });

    test('should show toolbar and footer (for all components as default)', () => {
      mockRoute.dataMap$ = of({ toolbar: undefined, footer: undefined });
      expect(component.toolbar$.next).toBeCalledWith(true);
      expect(component.footer$.next).toBeCalledWith(true);
    });

    test('should hide toolbar and footer (eg: PNF)', () => {
      mockRoute.dataMap$ = of({ toolbar: false, footer: false });
      expect(component.toolbar$.next).toBeCalledWith(false);
      expect(component.footer$.next).toBeCalledWith(false);
    });
  });
});
