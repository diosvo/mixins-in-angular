import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInOneViewComponent } from './crud-in-one-view.component';

describe('CrudInOneViewComponent', () => {
  let component: CrudInOneViewComponent;
  let fixture: ComponentFixture<CrudInOneViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudInOneViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInOneViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
