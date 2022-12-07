import { LineBreakPipe } from './line-break.pipe';

describe('LineBreakPipe', () => {
  let pipe: LineBreakPipe;

  beforeEach(() => {
    pipe = new LineBreakPipe();
  });

  test('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  test('should transform search string that includes line break', () => {
    expect(pipe.transform('diosvo\n9')).toBe('diosvo<br />9');
  });
});