import { StateAtom } from './atom.service';

const valueChanges = 'dios' as const;
const initialValue = 'diosvo' as const;

describe('StateAtom', () => {
  let service: StateAtom<string>;

  beforeEach(() => {
    service = new StateAtom(initialValue);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should update new value', () => {
    jest.spyOn(service['store'], 'next');
    service.update(valueChanges);

    expect(service['value']).toBe(valueChanges);
    expect(service['store'].next).toBeCalledWith(valueChanges);
  });

  test('should get current value', () => {
    service['value'] = initialValue;
    expect(service.getValue()).toBe(initialValue);
  });

  test('should reset to initial value', () => {
    service['value'] = valueChanges;
    service['initialValue'] = initialValue;

    service.reset();
    expect(service['value']).toBe(initialValue);
  });
});
