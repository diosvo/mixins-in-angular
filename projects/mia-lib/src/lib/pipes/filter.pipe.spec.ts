import { FormControl } from '@angular/forms';
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
      expect(pipe.transform([data], null)).toEqual([data]);
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
