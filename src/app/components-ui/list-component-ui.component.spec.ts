import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { MenuItemModule } from '@home/components/menu-item/menu-item.module';
import { AlertModule } from '@lib/components/alert/alert.module';
import { ListComponentUiComponent } from './list-component-ui.component';

describe('ListComponentUiComponent', () => {
  let component: ListComponentUiComponent;
  let fixture: ComponentFixture<ListComponentUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponentUiComponent],
      imports: [
        AuthModule,
        AlertModule,
        MenuItemModule,
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
  });

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

  describe('should call', () => {
    test('onFormChanges()', async () => {
      jest.spyOn(component, 'onFilters');
      jest.spyOn(component, 'updateParams');

      await component.onFormChanges();
      component.componentsForm.setValue({
        query: 'button',
        group: 'button'
      });

      component.componentsForm.valueChanges.subscribe(_ => {
        fixture.detectChanges();
        expect(component.onFilters).toBeCalled();
        expect(component.updateParams).toBeCalled();
      });
    });
  });
});
