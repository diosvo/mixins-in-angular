import { fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { CustomSelectComponent } from './custom-select.component';

describe('CustomSelectComponent', () => {
  let component: CustomSelectComponent<unknown>;

  const value: string = 'test' as const;

  beforeEach(() => {
    component = new CustomSelectComponent({} as any);
  });

  afterEach(() => {
    jest.spyOn(component, 'ngOnDestroy');
    component.ngOnDestroy();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges()', () => {
    test('setup data if the items is an array', () => {
      component.items = [value];
      component.ngOnChanges();

      expect(component['currentStaticItems']).toEqual([value]);
      expect(component['isServerSide']).toBe(false);
    });

    test('throw error if the items is not an array', () => {
      component.items = {} as any;
      expect(() => component.ngOnChanges()).toThrow(new Error('The items should be an array.'));
    });
  });

  test('ngOnInit()', () => {
    jest.spyOn(component as any, 'watchForFilterChanges');
    component.ngOnInit();
    expect(component['watchForFilterChanges']).toBeCalled();
  });

  describe('watchForFilterChanges()', () => {
    test('should emit the value (to query from BE) if the server side is true', fakeAsync((done) => {
      component['isServerSide'] = true;
      component.filterControl.setValue(value);
      jest.spyOn(component.selectedItem, 'emit');

      component['watchForFilterChanges']();
      tick(200);

      component.filterControl.valueChanges.subscribe((value: string) => {
        expect(component.selectedItem.emit).toBeCalledWith(value);
        done();
      });
    }));

    test('should call the function (to filter results on FE) if the server side is false', fakeAsync((done) => {
      component['isServerSide'] = false;
      component.filterControl.setValue(value);
      jest.spyOn(component as any, 'filteredItems');

      component['watchForFilterChanges']();
      tick(200);

      component.filterControl.valueChanges.subscribe((value: string) => {
        expect(component['filteredItems']).toBeCalledWith(value);
        done();
      });
    }));
  });

  test('filteredItems()', () => {
    component['currentStaticItems'] = [value, 'test_2'];
    jest.spyOn(component as any, 'normalizeValue').mockReturnValue(value);

    component['filteredItems'](value);
    (component.items as Observable<Array<unknown>>).subscribe((response: Array<string>) => {
      expect(response).toEqual([value]);
    });
  });

  describe('normalizeValue()', () => {
    test('if the value is type string', () => {
      expect(component['normalizeValue'](value)).toBe(value);
    });

    test('if the value is not type string', () => {
      component.bindLabelKey = 'name';
      expect(component['normalizeValue']({ [component.bindLabelKey]: value })).toBe(value);
    });
  });

  describe('sortFunc() to sort values from select options', () => {
    describe('if the bindLabelKey is defined', () => {

      beforeEach(() => {
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

    test('return ascending if the items does not include object schema', () => {
      expect(component.sortFunc()).toBe(1);
    });
  });
});
