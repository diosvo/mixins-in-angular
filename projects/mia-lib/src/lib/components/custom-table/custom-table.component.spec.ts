import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MOCK_LIST_USERS } from '@lib/mocks/json-placeholder/user.mock';
import { User } from '@lib/models/json-placeholder/user.model';
import * as rxjs from 'rxjs';
import { CustomTableComponent, TableColumn } from './custom-table.component';

const columns: TableColumn[] = [
  { key: 'id', flex: '100%' },
];

const mapped_column_keys = ['id'];

describe('CustomTableComponent', () => {
  let component: CustomTableComponent<unknown>;
  let windowSpy;

  const key_id = {
    key: 'id'
  };

  beforeEach(() => {
    component = new CustomTableComponent<unknown>();
    windowSpy = jest.spyOn(window, 'requestAnimationFrame');
  });

  afterEach(() => {
    jest.clearAllMocks();
    windowSpy.mockRestore();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should update input decorator value', () => {
    describe('@Input data', () => {
      beforeEach(() => {
        component.columns = columns;
        jest.spyOn(component as any, 'configDisplayColumns');
        jest.spyOn(component as any, 'configPaginator');
        jest.spyOn(component as any, 'configSorting');
      });

      afterEach(() => {
        expect(component['displayedColumns']).toEqual(mapped_column_keys);
      });

      test('should not call any configurations when no data found', () => {
        jest.spyOn(component as any, 'setDataSource');
        component.data = [];

        expect(component['setDataSource']).toBeCalledWith([]);
        expect(component['configDisplayColumns']).not.toBeCalled();
        expect(component['configPaginator']).not.toBeCalled();
        expect(component['configSorting']).not.toBeCalled();
      });

      test('should call configurations when data is passed in', () => {
        jest.spyOn(component as any, 'setDataSource');
        component.data = MOCK_LIST_USERS;

        expect(component['setDataSource']).toBeCalledWith(MOCK_LIST_USERS);
        expect(component['configDisplayColumns']).toBeCalled();
        expect(component['configPaginator']).toBeCalled();
        expect(component['configSorting']).toBeCalled();
      });
    });
  });

  describe('columnTemplates()', () => {
    test('returns empty object if there has no templates', () => {
      component['columnDefs'] = null;
      expect(component.columnTemplates).toEqual({});
    });
  });

  describe('ngOnChanges() to detect data changes', () => {
    beforeEach(() => {
      component['source'] = new MatTableDataSource<unknown>([]);
    });

    test('should re-defined pageSize when pageSizeOptions changes', () => {
      const changes: any = {
        data: {
          currentValue: ['test'],
          firstChange: false
        },
        pageSizeOptions: {
          currentValue: [10, 20]
        },
      };
      component.ngOnChanges(changes);
      expect(component.pageSize).toEqual(10);
    });
  });

  // TODO: columnDefs is undefined
  describe.skip('ngAfterViewInit()', () => {
    test('should show views after after views are initialized', () => {
      jest.spyOn(component as any, 'configColumnTemplates');
      jest.spyOn(component as any, 'configPaginator');
      component['source'] = new MatTableDataSource([]);

      component.ngAfterViewInit();

      expect(component['configColumnTemplates']).toBeCalled();
      expect(component['source'].sort).toEqual(component['matSort']);
      expect(component['configPaginator']).toBeCalled();
    });
  });

  describe('setDataSource()', () => {
    test('should update table view whenever the source changes', () => {
      component['setDataSource']([]);
      expect(component['source'].data).toEqual([]);
    });
  });

  describe('configSorting()', () => {
    beforeEach(() => {
      component['source'] = new MatTableDataSource<User>(MOCK_LIST_USERS);
      component['displayedColumns'] = mapped_column_keys;
    });

    test('should get the first property if no default key is passed in', () => {
      component.defaultSortColumn = undefined;
      component['configSorting']();
      expect(component.defaultSortColumn).toEqual(key_id.key);
    });

    test('should config sorting correctly', () => {
      component.defaultSortColumn = key_id.key;
      component['configSorting']();
      expect(component['source'].sort).toEqual(component['matSort']);
    });

    test('show error if the provided key does not exist in columns declaration', () => {
      component.defaultSortColumn = 'test';
      expect(() => component['configSorting']()).toThrow('The provided default key for sorting does not exist in the column declaration.');
    });
  });

  describe('configPaginator()', () => {
    test('call paginator if length property is undefined', () => {
      component.length = undefined;
      component['configPaginator']();
      expect(component['source'].paginator).toEqual(component['paginator']);
    });

    test('call matPaginator if length property is defined', () => {
      component.length = 1;
      component['configPaginator']();
      expect(component['source'].paginator).toEqual(component['matPaginator']);
    });
  });

  describe('configDisplayColumns()', () => {
    beforeEach(() => {
      component['displayedColumns'] = mapped_column_keys;
    });

    test('should add the [select] column if [enableCheckbox] is truthy', () => {
      component.enableCheckbox = true;
      component['configDisplayColumns']();
      expect(component['displayedColumns']).toEqual([component.select, key_id.key]);
    });

    test('should add the [select] column if [enableExpansion] is truthy', () => {
      component.enableExpansion = true;
      component['configDisplayColumns']();
      expect(component['displayedColumns']).toEqual([component.expand, component.select, key_id.key]);
    });
  });

  test('onPageChanged()', () => {
    const page: PageEvent = {
      pageIndex: 0,
      pageSize: 10,
      length: 10
    };
    jest.spyOn(component.pageChanges, 'emit');

    (component as any)['tableRef'] = {
      nativeElement: {
        scrollIntoView: jest.fn()
      }
    };
    windowSpy.requestAnimationFrame = jest.fn().mockImplementationOnce(() => {
      return () => component['tableRef'];
    });

    component.onPageChanged(page);

    expect(component.pageChanges.emit).toBeCalledWith(page);
    expect(component.pageIndex).toBe(page.pageIndex);
    expect(component.pageSize).toBe(page.pageSize);
    // expect(component['tableRef'].nativeElement.scrollIntoView).toBeCalledWith({ behavior: 'smooth', block: 'end', inline: 'start' });
  });

  describe('isAllSelected() to check master toggle state', () => {
    beforeEach(() => {
      component['source'] = new MatTableDataSource<User>(MOCK_LIST_USERS);
    });

    test('when all items are checked', () => {
      component['selection'] = { selected: MOCK_LIST_USERS } as any;
      expect(component.isAllSelected()).toBe(true);
    });

    test('when only some item/s is/are checked', () => {
      component['selection'] = { selected: [] } as any;
      expect(component.isAllSelected()).toBe(false);
    });
  });

  describe('masterToggle() to check toggle state', () => {
    beforeEach(() => {
      component['selection'] = {
        clear: jest.fn(),
        select: jest.fn().mockReturnValue({})
      } as any;
      component['source'] = { data: [{ id: 1 }] } as any;
    });

    test('checked when check all items in data source', () => {
      jest.spyOn(component, 'isAllSelected').mockReturnValue(true);
      component.masterToggle();
      expect(component['selection'].clear).toBeCalled();
    });

    test('indeterminate when check item/s from data source', () => {
      jest.spyOn(component, 'isAllSelected').mockReturnValue(false);
      component.masterToggle();
      component['source'].data.forEach(row => expect(component['selection'].select(row)));
    });
  });

  describe('isFixed$()', () => {
    beforeEach(() => {
      window = Object.assign(window, { scrollY: 900 });
      jest.spyOn(rxjs, 'fromEvent').mockReturnValue(rxjs.of({ type: 'scroll' }));
    });

    test('should set header under the toolbar', (done) => {
      (component as any)['headerRef'] = {
        nativeElement: {
          offsetTop: 901
        }
      };
      component['isFixed$']().subscribe((fixed: boolean) => {
        expect(fixed).toBe(false);
        done();
      });
    });

    test('should stick header as initial state', (done) => {
      (component as any)['headerRef'] = {
        nativeElement: {
          offsetTop: 899
        }
      };
      component['isFixed$']().subscribe((fixed: boolean) => {
        expect(fixed).toBe(true);
        done();
      });
    });
  });
});
