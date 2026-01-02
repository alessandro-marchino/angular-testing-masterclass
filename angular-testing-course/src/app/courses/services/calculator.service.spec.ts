import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {
  it('Should add two numbers', () => {
    // Given
    const calculator = new CalculatorService(new LoggerService());
    // When
    const result = calculator.add(2, 3);
    // Then
    expect(result).toBe(5);
  });
  it('Should subtract two numbers', () => {
    // Given
    const calculator = new CalculatorService(new LoggerService());
    // When
    const result = calculator.subtract(2, 3);
    // Then
    expect(result).toBe(-1, 'Unexpected subtraction result');
  });
});
