import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsavedFormComponent } from './unsaved-form.component';

describe('UnsavedFormComponent', () => {
  let component: UnsavedFormComponent;
  let fixture: ComponentFixture<UnsavedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsavedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsavedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
