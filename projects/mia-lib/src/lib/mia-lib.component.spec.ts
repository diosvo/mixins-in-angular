import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiaLibComponent } from './mia-lib.component';

describe('MiaLibComponent', () => {
  let component: MiaLibComponent;
  let fixture: ComponentFixture<MiaLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiaLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiaLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
