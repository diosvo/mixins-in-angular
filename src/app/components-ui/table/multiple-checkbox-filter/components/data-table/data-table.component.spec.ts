import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from '@lib/components/alert/alert.module';
import { CustomTableModule } from '@lib/components/custom-table/custom-table.module';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableComponent, SearchFilterComponent],
      imports: [
        AlertModule,
        CustomTableModule,

        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('ngOnInit()', () => {
    jest.spyOn(component as any, 'getIssues');
    component.ngOnInit();
    expect(component['getIssues']).toBeCalled();
  });

  describe('getIssues()', () => {
    test('should return empty data when no data found', () => {
      component['getIssues']();
      component['_pageIndex$'].next(0);
      component['_filters$'].next({ query: 'test', state: ['close'] });

      component.issues$.subscribe(response => {
        expect(response).toEqual([]);
      });
    });
  });

  test('pageChanges()', () => {
    const page = { pageIndex: 1 } as any;
    jest.spyOn(component['_pageIndex$'], 'next');

    component.pageChanges(page);
    expect(component['_pageIndex$'].next).toBeCalledWith(page.pageIndex);
  });

  test('filteredIssues()', () => {
    const params = {
      query: '',
      state: ['open']
    };
    jest.spyOn(component['_filters$'], 'next');

    component.filteredIssues(params);
    expect(component['_filters$'].next).toBeCalledWith(params);
  });
});
