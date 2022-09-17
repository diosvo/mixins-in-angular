import { ButtonLoaderIconDirective } from './button-loader-icon.directive';
import { CustomButtonComponent } from './custom-button.component';

describe('CustomButtonComponent', () => {
  let component: CustomButtonComponent;

  beforeEach(() => {
    component = new CustomButtonComponent('icon');
    (component as any).icon = new ButtonLoaderIconDirective({} as any);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
