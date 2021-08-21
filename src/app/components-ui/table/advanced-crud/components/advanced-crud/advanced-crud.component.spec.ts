import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedCrudComponent } from './advanced-crud.component';

describe('AdvancedCrudComponent', () => {
  let component: AdvancedCrudComponent;
  let fixture: ComponentFixture<AdvancedCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
