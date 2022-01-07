import { deepFlatten } from './array-utils';

describe('./array-utils', () => {
  test('deepFlatten() to flat nested array', () => {
    expect(deepFlatten([1, 2, [3, 4]])).toEqual([1, 2, 3, 4]);
    expect(deepFlatten([[1, [2]], [3, 4]])).toEqual([1, 2, 3, 4]);
  });
});