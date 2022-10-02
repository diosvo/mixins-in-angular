
import { SelectOptionComponent } from './select-option.component';

describe('SelectOptionComponent', () => {
  let component: SelectOptionComponent;

  const mockElementRef: any = {
    nativeElement: jest.fn()
  };

  beforeEach(() => {
    component = new SelectOptionComponent(mockElementRef);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
