import { Observable, of } from 'rxjs';
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
    test('should map data to observable type', () => {
      const changes: any = {
        items: {
          currentValue: [value],
          firstChange: true
        }
      };
      component.ngOnChanges(changes);
      expect(component['primitiveItems']).toEqual([value]);
      (component.items as Observable<string[]>).subscribe((response: string[]) => {
        expect(response).toEqual([value]);
      });
    });
  });

  describe('ngOnInit()', () => {
    test('should call watchForChanges after page load', () => {
      jest.spyOn(component as any, 'watchForChanges');
      component.ngOnInit();
      expect(component['watchForChanges']).toBeCalled();
    });
  });

  describe('watchForChanges()', () => {
    test('should filter data whenever query changes', () => {
      component.items = of([value]);
      component['query'].setValue('');

      component['watchForChanges']();
      component['query'].setValue('aaaa');

      (component.items as Observable<string[]>).subscribe((response: string[]) => {
        expect(response).toEqual([]);
      });
    });
  });

  describe('sortFunc() to sort values from select options', () => {
    describe('if the bindKeyValue is true', () => {
      beforeEach(() => {
        component.bindKeyValue = true;
        component.bindLabelKey = 'name';
      });

      test('returns ascending', () => {
        const prev = { [component.bindLabelKey]: 'bbb' };
        const next = { [component.bindLabelKey]: 'aaa' };
        expect(component.sortFunc(prev, next)).toBe(1);
      });

      test('returns descending', () => {
        const prev = { [component.bindLabelKey]: 'aaa' };
        const next = { [component.bindLabelKey]: 'bbb' };
        expect(component.sortFunc(prev, next)).toBe(-1);
      });
    });

    test('return ascending if the items does not include object schema (bindKeyValue is false as default)', () => {
      expect(component.sortFunc()).toBe(1);
    });
  });

  describe('conditions to check the parent box (All)', () => {
    test('hasValue() to determine there has values or not', () => {
      component['primitiveItems'] = [];
      expect(component.hasValue()).toBe(false);

      component['primitiveItems'] = [value];
      expect(component.hasValue()).toBe(true);
    });

    // TODO: can not mock injector :(!?)

    test.skip('isAllSelected() to determine whether all options are selected or not', () => {
      component.control.setValue([value]);
      component['primitiveItems'] = [value];
      expect(component.isAllSelected()).toBe(true);

      component.control.setValue([]);
      component['primitiveItems'] = [value];
      expect(component.isAllSelected()).toBe(true);
    });

    test.skip('toggleSelection() to update value whenever the parent checkbox is checked', () => {
      jest.spyOn(component.control, 'setValue');
      component.toggleSelection({ checked: true } as any);
      expect(component.control.setValue).toBeCalledWith(component['primitiveItems']);

      component.toggleSelection({ checked: false } as any);
      expect(component.control.setValue).toBeCalledWith([]);
    });
  });
});
