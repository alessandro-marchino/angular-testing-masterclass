import { describe, expect, it } from 'vitest';
import { calculator } from './calculator';

describe("Vitest Fundamentals", () => {
  it("Should add two numbers", () => {
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
  });
});
