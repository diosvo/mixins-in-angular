import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent, SearchFilterComponent],
      imports: [
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,

        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should call', () => {
    it('resetFilters()', () => {
      component.searchFilter.resetForm = jest.fn();
      component.resetFilters();
      expect(component.searchFilter.resetForm).toBeCalled();
    });
  });
});
