import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {
  it('Should add two numbers', () => {
    // Given
    const logger = new LoggerService();
    spyOn(logger, 'log');
    const calculator = new CalculatorService(logger);
    // When
    const result = calculator.add(2, 3);
    // Then
    expect(result).toBe(5);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });
  it('Should subtract two numbers', () => {
    // Given
    const logger = jasmine.createSpyObj<LoggerService>('loggerService', ['log']);
    // logger.log.and.returnValue();
    const calculator = new CalculatorService(logger);
    // When
    const result = calculator.subtract(2, 3);
    // Then
    expect(result).toBe(-1, 'Unexpected subtraction result');
    expect(logger.log).toHaveBeenCalledTimes(1);
  });
});
