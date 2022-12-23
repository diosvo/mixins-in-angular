import { ɵdefaultKeyValueDiffers as defaultKeyValueDiffers } from '@angular/core';
import { CustomKeyValuePipe } from './custom-key-value.pipe';

describe('CustomKeyValuePipe', () => {
  let pipe: CustomKeyValuePipe<string, string>;

  beforeEach(() => {
    pipe = new CustomKeyValuePipe(defaultKeyValueDiffers);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform()', () => {
    const object = new Map();
    object.set('low', 'Low');
    object.set('medium', 'Medium');
    object.set('high', 'High');

    it('should keep preserve original property order', () => {
      expect(pipe.transform(object)).toEqual([
        { key: 'low', value: 'Low' },
        { key: 'medium', value: 'Medium' },
        { key: 'high', value: 'High' }
      ]);
    });

    it('should sort data by [key] property', () => {
      expect(pipe.transform(object, 'key')).toEqual([
        { key: 'high', value: 'High' },
        { key: 'low', value: 'Low' },
        { key: 'medium', value: 'Medium' }
      ]);
    });

    it('should sort data by [value] property', () => {
      expect(pipe.transform(object, 'value')).toEqual([
        { key: 'high', value: 'High' },
        { key: 'low', value: 'Low' },
        { key: 'medium', value: 'Medium' }
      ]);
    });
  });
});
