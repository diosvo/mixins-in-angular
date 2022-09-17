import { NavbarComponent } from './navbar.component';

const width = 92 as const;
const index = 3 as const;

describe('NavbarComponent', () => {
  let component: NavbarComponent;

  beforeEach(() => {
    component = new NavbarComponent();
  });

  test('should create component', () => {
    expect(component).toBeTruthy();
  });

  test('should get animation style', () => {
    component['sizes'] = {
      listItemWidth: width,
      translateX: width * index
    };
    expect(component.animate).toEqual({
      width: '92px',
      transform: 'translateX(276px)'
    });
  });

  test('should update the current styles', () => {
    const mockElement: any = {
      getBoundingClientRect: jest.fn().mockReturnValue({ width })
    };

    component.onSelect(mockElement, index);

    expect(component['selected']).toEqual(index);
    expect(component['sizes']).toEqual({
      listItemWidth: width,
      translateX: width * index
    });
  });
});