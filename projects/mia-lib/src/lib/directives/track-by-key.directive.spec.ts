import { TrackByKeyDirective } from './track-by-key.directive';

describe('TrackByKeyDirective', () => {
  let directive: TrackByKeyDirective<unknown>;

  const mockNgFor: any = {
    ngForTrackBy: jest.fn()
  };

  beforeEach(() => {
    directive = new TrackByKeyDirective(mockNgFor);
  });

  test('should initialize directive', () => {
    expect(directive).toBeTruthy();
  });

  describe('@Input trackByKey()', () => {
    test('should set default value to empty string when no value is passed in', () => {
      directive.trackByKey = undefined;
      expect(directive['_propertyName']).toBe('');
    });

    test('should set new value if value is passed in', () => {
      directive.trackByKey = 'name';
      expect(directive['_propertyName']).toBe('name');
    });
  });
});