import { FormBuilder, FormGroup } from '@angular/forms';
import { AdvancedCrudComponent } from './advanced-crud.component';

describe('AdvancedCrudComponent', () => {
  let component: AdvancedCrudComponent;

  const mockUserService: any = {
    loadState: jest.fn(),
    adjust: jest.fn(),
    delete: jest.fn()
  };

  const mockUserDetailsService: any = {
    buildForm: new FormGroup({})
  };

  beforeEach(() => {
    component = new AdvancedCrudComponent(
      new FormBuilder(),
      mockUserService,
      mockUserDetailsService
    );
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
