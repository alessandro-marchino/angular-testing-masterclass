import { describe, expect, it } from 'vitest';
import { calculator } from './calculator';

describe("Vitest Fundamentals", () => {
  it.skipIf(false)("Should add two numbers", () => {
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
  });

  it.skip("Should add two numbers V2", () => {
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
  });

  // With .only ou can run only this test
  it("Should add two numbers V3", () => {
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
  });
});
