import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CustomTableComponent } from './custom-table.component';

describe('CustomTableComponent', () => {
  let component: CustomTableComponent<unknown>;
  let fixture: ComponentFixture<CustomTableComponent<unknown>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTableComponent],
      imports: [
        MatSortModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,

        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.spyOn(component, 'ngOnDestroy');
    fixture.destroy();
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

  describe('ngOnChanges() to detect data changed', () => {
    beforeEach(() => jest.spyOn(component as any, 'getData'));

    test('should returns empty when data does NOT change', () => {
      const changes = {
        data: {
          currentValue: undefined
        },
      } as any;
      component.ngOnChanges(changes);
      expect(component['getData']).not.toHaveBeenCalled();
    });

    test('should redefined data when data changed', () => {
      component.data = of([]);
      const changes = {
        data: {
          currentValue: of([])
        },
      } as any;

      component.ngOnChanges(changes);
      expect(component['getData']).toHaveBeenCalled();
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

  describe('getData() to define source with sorting and', () => {
    beforeEach(() => component.data = of([{ id: 1 }]));

    afterEach(() => expect(component.source.sort).toEqual(component['sort']));

    test('paginator as default options', () => {
      component.data = of([{ id: 1 }]);
      component['getData']();
      expect(component.source.paginator).toEqual(component['paginator']);
    });

    test('hide paginator', () => {
      component.pageable = false;
      component['getData']();
      expect(component.source.paginator).toBeNull();
    });
  });

  describe('configDisplayColumns() to determine what columns will be shown when checkbox is', () => {
    beforeEach(() => component.columns = [{ key: 'id' }]);

    test('enable (select column will be the first column on data table)', () => {
      component.enableCheckbox = true;
      component['configDisplayColumns']();

      expect(component.displayColumns).toEqual([component.select, 'id']);
      expect(component.columns).toEqual([
        { key: component.select },
        { key: 'id' }
      ]);
    });

    test('disable', () => {
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
    const page: PageEvent = {
      pageIndex: 0,
      pageSize: 10,
      length: 10
    };

    component.onPageChanged(page);

    expect(component.pageChanges.emit).toBeCalledWith(page);
    expect(component.pageIndex).toBe(page.pageIndex);
    expect(component.pageSize).toBe(page.pageSize);
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
