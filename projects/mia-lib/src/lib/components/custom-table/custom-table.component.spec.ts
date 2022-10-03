import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@lib/services/users/user-service.model';
import { MOCK_LIST_USERS, MOCK_USER } from '@lib/services/users/user.mock';
import { CustomTableComponent } from './custom-table.component';

describe('CustomTableComponent', () => {
  let component: CustomTableComponent<unknown>;
  let windowSpy;

  const key_id = {
    key: 'id'
  };

  const key_select = {
    key: 'select'
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
    test('@Input data', () => {
      jest.spyOn(component as any, 'setDataSource');
      component.data = [];
      expect(component['setDataSource']).toBeCalledWith([]);
    });

    test('@Input data', () => {
      const value = { length: 10 };
      component['matPaginator'] = { ...value } as any;
      expect(component['paginator']).toEqual({ ...value });
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

  describe('getIndex()', () => {
    test('returns an index directly when the data is fetching from server side', () => {
      component.length = 1;
      expect(component.getIndex(1)).toBe(1);
    });

    describe('modify an index when the data is fetching from client side', () => {
      beforeEach(() => {
        component.length = undefined;
        component.pageIndex = 1;
      });

      test('if pageSize is undefined', () => {
        component.pageSize = undefined;
        expect(component.getIndex(1)).toBe(6);
      });

      test('if pageSize is defined', () => {
        component.pageSize = 10;
        expect(component.getIndex(1)).toBe(11);
      });
    });
  });

  describe('configSorting()', () => {
    beforeEach(() => {
      component['source'] = new MatTableDataSource<User>([MOCK_USER]);
    });

    test('should config sorting correctly', () => {
      component.columns = [key_id];
      component.defaultSortColumn = 'id';

      component['configSorting']();
      expect(component['source'].sort).toEqual(component['matSort']);
    });

    test('show error if the provided key does not exist in columns declaration', () => {
      component.columns = [key_id];
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
    describe('if [enableCheckbox] is true (select column will be the first column on data table)', () => {
      beforeEach(() => {
        component.enableCheckbox = true;
      });

      test('should add the select column if it does not exist', () => {
        component.columns = [key_id];
        component['source'] = new MatTableDataSource<User>([MOCK_USER]);

        component['configDisplayColumns']();

        expect(component.displayColumns).toEqual([component.select, 'id']);
        expect(component.columns).toEqual([key_select, key_id]);
      });

      test('should remove the select column if no data configured or no data found', () => {
        component.columns = [key_select, key_id];
        component['source'] = new MatTableDataSource<User>([]);

        component['configDisplayColumns']();

        expect(component.displayColumns).toEqual(['id']);
        expect(component.columns).toEqual([key_id]);
      });
    });

    describe('if [enableCheckbox] is false', () => {
      test('should not add select key into the columns declaration', () => {
        component.columns = [key_id];
        component.enableCheckbox = false;

        component['configDisplayColumns']();

        expect(component.displayColumns).toEqual(['id']);
        expect(component.columns).toEqual([key_id]);
      });
    });
  });

  test('onPageChanged()', () => {
    const page: PageEvent = {
      pageIndex: 0,
      pageSize: 10,
      length: 10
    };
    jest.spyOn(component.pageChanges, 'emit');

    component['tableRef'] = {
      nativeElement: {
        scrollIntoView: jest.fn()
      }
    } as any;
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
});
