import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdvancedCrudComponent } from './advanced-crud.component';

describe('AdvancedCrudComponent', () => {
  let component: AdvancedCrudComponent;
  let fixture: ComponentFixture<AdvancedCrudComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdvancedCrudComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,

        MatProgressBarModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
