import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth/auth.module';
import { AlertModule } from '@lib/components/alert/alert.module';
import { ListComponentUiComponent } from './list-component-ui.component';

describe('ListComponentUiComponent', () => {
  let component: ListComponentUiComponent;
  let fixture: ComponentFixture<ListComponentUiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponentUiComponent],
      imports: [
        AuthModule,
        AlertModule,

        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,

        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatTooltipModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatProgressBarModule
      ],
      providers: [
        {
          provide: MatSnackBar,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponentUiComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.spyOn(component, 'ngOnDestroy');
    fixture.destroy();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
