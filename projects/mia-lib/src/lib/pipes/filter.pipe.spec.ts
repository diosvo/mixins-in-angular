import { FilterPipe } from './filter.pipe';

const data = {
  name: 'diosvo'
};

describe('FilterPipe', () => {
  let pipe: FilterPipe<unknown>;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  test('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform()', () => {
    test('returns primitive data if data is not found or query string is empty', () => {
      expect(pipe.transform([], 'diosvo')).toEqual([]);
      expect(pipe.transform([data], '')).toEqual([data]);
    });

    test('should call filterFn() to find the results', () => {
      expect(pipe.transform([data], 'd')).toEqual([data]);
      expect(pipe.transform([data], 'aaa')).toEqual([]);
    });
  });

  describe('filterFn()', () => {
    test('should filter data with object key', () => {
      expect(pipe['filterFn'](data, 'diosvo')).toEqual(true);
      expect(pipe['filterFn'](data, 'hi')).toEqual(false);
    });

    test('should filter data without object key', () => {
      expect(pipe['filterFn']('diosvo', 'd')).toEqual(true);
      expect(pipe['filterFn']('diosvo', 'aaa')).toEqual(false);
    });
  });
});
