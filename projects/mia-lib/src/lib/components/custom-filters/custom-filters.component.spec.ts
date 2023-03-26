import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFiltersComponent } from './custom-filters.component';

describe('CustomFiltersComponent', () => {
  let component: CustomFiltersComponent;
  let fixture: ComponentFixture<CustomFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CustomFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
