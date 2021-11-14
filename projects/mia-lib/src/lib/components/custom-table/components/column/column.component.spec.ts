import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnComponent } from './column.component';

describe('ColumnComponent', () => {
  let component: ColumnComponent<unknown>;
  let fixture: ComponentFixture<ColumnComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
