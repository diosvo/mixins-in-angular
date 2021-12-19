import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFilterComponent } from './search-filter.component';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFilterComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,

        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    component.filterForm = new FormGroup({
      query: new FormControl(''),
      state: new FormControl(['closed']),
    });
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.spyOn(component, 'ngOnDestroy');
    fixture.destroy();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('watch for filters change', fakeAsync(() => {
    jest.spyOn(component.filters, 'emit');

    component.ngOnInit();
    component.filterForm.patchValue({ query: '1', state: ['open'] });
    tick(100);

    component.filterForm.valueChanges.subscribe(response => expect(component.filters.emit).toBeCalledWith(response));
  }));
});
