import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWebUiComponent } from './list-web-ui.component';

describe('ListWebUiComponent', () => {
  let component: ListWebUiComponent;
  let fixture: ComponentFixture<ListWebUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWebUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWebUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
