import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterComponent } from './search-filter.component';

describe.skip('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [
        FormBuilder,
        ReactiveFormsModule
      ],
      declarations: [SearchFilterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    component.filterForm = new FormGroup({
      query: new FormControl(''),
      state: new FormControl('open'),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
