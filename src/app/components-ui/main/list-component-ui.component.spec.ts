import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponentUiComponent } from './list-component-ui.component';

describe('ListComponentUiComponent', () => {
  let component: ListComponentUiComponent;
  let fixture: ComponentFixture<ListComponentUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponentUiComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponentUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('should create', () => {
    try {
      test ('hello', () => {
        expect(component).toBeTruthy();
      });
    } catch (e) { }
  });
});
