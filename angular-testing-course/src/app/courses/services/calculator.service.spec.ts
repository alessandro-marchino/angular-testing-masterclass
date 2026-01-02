import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";
import { TestBed } from '@angular/core/testing';

describe('CalculatorService', () => {
  let loggerSpy: jasmine.SpyObj<LoggerService>;
  let calculator: CalculatorService;
  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj<LoggerService>('loggerService', ['log']);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    });
    calculator = TestBed.inject(CalculatorService);
  });

  it('Should add two numbers', () => {
    // Given
    // When
    const result = calculator.add(2, 3);
    // Then
    expect(result).toBe(5);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
  it('Should subtract two numbers', () => {
    // Given
    // When
    const result = calculator.subtract(2, 3);
    // Then
    expect(result).toBe(-1, 'Unexpected subtraction result');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
