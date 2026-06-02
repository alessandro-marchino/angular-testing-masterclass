import { describe, expect, it, vi } from 'vitest';
import { calculator } from './calculator';

describe("Vitest Fundamentals", () => {
  it("Should add two numbers", () => {
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
  });

  it("Shows how spies work", () => {
    const spy = vi.spyOn(calculator, 'add');
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(2, 3);
  });

  it("Shows how mocking work", () => {
    const spy = vi.spyOn(calculator, 'add').mockReturnValue(5);
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(2, 3);

    const result2 = calculator.add(5, 5);
    expect(result2).not.toBe(10);
  });

  it("Shows how pure mocks work", () => {
    const addMock = vi.fn().mockReturnValue(10);
    const result = addMock(10, 5);
    expect(result).toBe(10);
    expect(addMock).toHaveBeenCalledOnce();
    expect(addMock).toHaveBeenCalledWith(10, 5);
  });

  it("Shows how mocks clearing work", () => {
    const spy = vi.spyOn(calculator, 'add').mockReturnValue(5);
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
    expect(spy).toHaveBeenCalledOnce();

    spy.mockClear();
    const result2 = calculator.add(5, 5);
    expect(result2).not.toBe(10);
    expect(spy).toHaveBeenCalledOnce();
  });
});
