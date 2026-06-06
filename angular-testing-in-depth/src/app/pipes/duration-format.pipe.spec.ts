import { beforeEach, describe, expect, it } from 'vitest';
import { DurationFormatPipe } from './duration-format.pipe';

describe('DurationFormatPipe', () => {
  let pipe: DurationFormatPipe;

  beforeEach(() => {
    pipe = new DurationFormatPipe();
  });

  it('Should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should format duration', () => {
    expect(pipe.transform("05:30")).toBe('05h 30m')
  });
  it('Should handle null or undefined', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });
  it('Should return the original value if invalid input', () => {
    expect(pipe.transform('90')).toBe('90');
  });
  it('Should only format the first two parts', () => {
    expect(pipe.transform("01:20:45")).toBe('01h 20m');
  });
});
