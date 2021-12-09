import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomButtonComponent, IconButtonComponent, PrimaryButtonComponent, TextButtonComponent } from './custom-button.component';

describe('CustomButtonComponent', () => {
  let component: CustomButtonComponent;
  let fixture: ComponentFixture<CustomButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TextButtonComponent,
        IconButtonComponent,
        CustomButtonComponent,
        PrimaryButtonComponent,
      ],
      imports: [
        MatIconModule,
        MatButtonModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should call get buttonComponentType() when type is', () => {
    test('primary', () => {
      component.type = 'primary';
      jest.spyOn(component, 'buttonComponentType').mockReturnValue(PrimaryButtonComponent);
      expect(component.buttonComponentType).toBeDefined();
    });

    test('icon', () => {
      component.type = 'icon';
      jest.spyOn(component, 'buttonComponentType').mockReturnValue(IconButtonComponent);
      expect(component.buttonComponentType).toBeDefined();
    });

    test('text', () => {
      component.type = 'text';
      jest.spyOn(component, 'buttonComponentType').mockReturnValue(TextButtonComponent);
      expect(component.buttonComponentType).toBeDefined();
    });
  });
});
