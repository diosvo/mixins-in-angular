import { CustomSelectComponent } from './custom-select.component';

describe('CustomSelectComponent', () => {
  let component: CustomSelectComponent<unknown>;

  const value: string = 'test' as const;

  beforeEach(() => {
    component = new CustomSelectComponent({
      get: jest.fn().mockReturnValue(expect.any),
      control: {
        get: jest.fn().mockReturnValue(expect.any)
      }
    } as any);
    component.items = [value];
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges()', () => {
    test('should set the original values', () => {
      const changes: any = {
        items: {
          currentValue: [value],
          firstChange: true
        }
      };
      component.ngOnChanges(changes);
      expect(component['primitiveItems']).toEqual([value]);
    });
  });

  describe('ngOnInit()', () => {
    test('should filter the item', () => {
      component.ngOnInit();
      // TODO: verify test here
    });
  });

  describe('conditions to check the parent box (All)', () => {
    // TODO: can not mock injector :(!?)

    test.skip('isAllSelected() to determine whether all options are selected or not', () => {
      component.control.setValue([value]);
      component['primitiveItems'] = [value];
      expect(component.isAllSelected).toBe(true);

      component.control.setValue([]);
      component['primitiveItems'] = [value];
      expect(component.isAllSelected).toBe(true);
    });

    test.skip('toggleSelection() to update value whenever the parent checkbox is checked', () => {
      jest.spyOn(component.control, 'setValue');
      component.masterToggle({ checked: true } as any);
      expect(component.control.setValue).toBeCalledWith(component['primitiveItems']);

      component.masterToggle({ checked: false } as any);
      expect(component.control.setValue).toBeCalledWith([]);
    });
  });
});
