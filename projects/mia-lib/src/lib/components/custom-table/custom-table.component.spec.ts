import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomTableComponent } from './custom-table.component';

describe.skip('CustomTableComponent', () => {
  let component: CustomTableComponent<unknown>;

  beforeEach(() => {
    component = new CustomTableComponent<unknown>();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('columnTemplates() when columnDefs is', () => {
    test('null', () => {
      component['columnDefs'] = null;
      expect(component.columnTemplates).toEqual({});
    });
  });

  describe('ngOnChanges() to detect data changes', () => {
    beforeEach(() => {
      component.source = new MatTableDataSource<unknown>([]);
    });

    test('should re-defined data source when the current data changes', () => {
      jest.spyOn(component as any, 'configPaginator');
      const changes: any = {
        data: {
          currentValue: ['test'],
          firstChange: false
        },
      };
      component.ngOnChanges(changes);

      expect(component.source.data).toEqual(changes.data.currentValue);
      expect(component.source.sort).toEqual(component['sort']);
      expect(component['configPaginator']).toBeCalled();
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

  test('ngOnInit()', () => {
    jest.spyOn(component as any, 'configDisplayColumns');
    component.ngOnInit();
    expect(component['configDisplayColumns']).toBeCalled();
  });

  test('ngAfterViewInit()', () => {
    jest.spyOn(component as any, 'configColumnTemplates');
    component.ngAfterViewInit();
    expect(component['configColumnTemplates']).toBeCalled();
  });

  describe('getIndex()', () => {
    test('returns an index when the data is fetching from server side', () => {
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

  describe('configPaginator()', () => {
    test('call paginator if length property is undefined', () => {
      component.length = undefined;
      component['configPaginator']();
      expect(component.source.paginator).toEqual(component['paginator']);
    });

    test('call matPaginator if length property is defined', () => {
      component.length = 1;
      component['configPaginator']();
      expect(component.source.paginator).toEqual(component['matPaginator']);
    });
  });

  describe('configDisplayColumns() to determine what columns will be shown', () => {
    beforeEach(() => component.columns = [{ key: 'id' }]);

    test('when checkbox is enable (select column will be the first column on data table)', () => {
      component.enableCheckbox = true;
      component['configDisplayColumns']();

      expect(component.displayColumns).toEqual([component.select, 'id']);
      expect(component.columns).toEqual([
        { key: component.select },
        { key: 'id' }
      ]);
    });

    test('when checkbox is disable', () => {
      component.enableCheckbox = false;
      component['configDisplayColumns']();

      expect(component.displayColumns).toEqual(['id']);
      expect(component.columns).toEqual([
        { key: 'id' }
      ]);
    });
  });

  test('onPageChanged()', () => {
    jest.spyOn(component.pageChanges, 'emit');
    component['tableRef'] = {
      nativeElement: {
        scrollIntoView: jest.fn()
      }
    } as any;
    const page: PageEvent = {
      pageIndex: 0,
      pageSize: 10,
      length: 10
    };

    component.onPageChanged(page);

    expect(component.pageChanges.emit).toBeCalledWith(page);
    expect(component.pageIndex).toBe(page.pageIndex);
    expect(component.pageSize).toBe(page.pageSize);
    expect(component['tableRef'].nativeElement.scrollIntoView).toBeCalledWith({ behavior: 'smooth', block: 'end', inline: 'start' });
  });

  describe('isAllSelected() to check master toggle state', () => {
    beforeEach(() => component.source = { data: [{ id: 1 }] } as any);

    test('when all items are checked', () => {
      component['selection'] = { selected: [{ id: 1 }] } as any;
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
      component.source = { data: [{ id: 1 }] } as any;
    });

    test('checked when check all items in data source', () => {
      jest.spyOn(component, 'isAllSelected').mockReturnValue(true);
      component.masterToggle();
      expect(component['selection'].clear).toBeCalled();
    });

    test('indeterminate when check item/s from data source', () => {
      jest.spyOn(component, 'isAllSelected').mockReturnValue(false);
      component.masterToggle();
      component.source.data.forEach(row => expect(component['selection'].select(row)));
    });
  });

  it('trackByIdx() to keep track from list', () => {
    expect(component.trackByIdx(0)).toEqual(0);
  });
});
