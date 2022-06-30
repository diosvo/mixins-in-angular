import { FormControl } from '@angular/forms';
import { FilterObjectPipe, FilterPipe } from './filter.pipe';

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

  describe('errorsHandler() to handle error cases', () => {
    test('should check provided data', () => {
      const message = 'Provided data should be an array.';
      expect(() => pipe['errorsHandler']({} as any, 'diosvo')).toThrow(message);
      expect(() => pipe['errorsHandler']([], 'diosvo')).not.toThrow(message);
    });

    test('should check query is provided or not', () => {
      const message = 'Query has not been provided.';
      expect(() => pipe['errorsHandler']([], undefined)).toThrow(message);
      expect(() => pipe['errorsHandler']([], 'diosvo')).not.toThrow(message);
    });

    test('should check type of Query', () => {
      const message = 'The type of query should be string.';
      expect(() => pipe['errorsHandler']([], new FormControl(null))).toThrow(message);
      expect(() => pipe['errorsHandler']([], 'diosvo')).not.toThrow(message);
      expect(() => pipe['errorsHandler']([], null)).not.toThrow(message);
    });
  });
});

describe('FilterObjectPipe', () => {
  describe('should test data has string/ number/ boolean type', () => {
    let pipe: FilterObjectPipe<string>;

    beforeEach(() => {
      pipe = new FilterObjectPipe();
    });

    test('should create an instance', () => {
      expect(pipe).toBeTruthy();
    });

    test('returns true if no data is passed in or query is empty', () => {
      expect(pipe.transform(null, 'test')).toBe(true);
      expect(pipe.transform('diosvo', '')).toBe(true);
    });

    test('returns true if value is found', () => {
      expect(pipe.transform('diosvo', 'diosvo')).toBe(true);
    });

    test('returns true if value is not found', () => {
      expect(pipe.transform('diosvo', 'aaa')).toBe(false);
    });
  });

  describe('should test data has object type', () => {
    let pipe: FilterObjectPipe<{ name: string }>;
    const name = { name: 'diosvo' };

    beforeEach(() => {
      pipe = new FilterObjectPipe();
    });

    test('should create an instance', () => {
      expect(pipe).toBeTruthy();
    });

    test('returns true if no data is passed in or query is empty', () => {
      expect(pipe.transform(null, 'test')).toBe(true);
      expect(pipe.transform(name, '')).toBe(true);
    });

    test('returns true if value is found', () => {
      expect(pipe.transform(name, 'diosvo')).toBe(true);
    });

    test('returns true if value is not found', () => {
      expect(pipe.transform(name, 'aaa')).toBe(false);
    });
  });
});
