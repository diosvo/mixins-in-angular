import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFunctionsComponent } from './list-functions.component';

describe('ListFunctionsComponent', () => {
  let component: ListFunctionsComponent;
  let fixture: ComponentFixture<ListFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFunctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
