import { CustomInputComponent } from './custom-input.component';

describe('CustomInputComponent', () => {
  let component: CustomInputComponent;

  beforeEach(() => {
    component = new CustomInputComponent({} as any);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
