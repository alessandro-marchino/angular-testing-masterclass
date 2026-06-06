import { Component, DebugElement } from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { HighlightDirective } from './highlight.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  imports: [ HighlightDirective ],
  template: `
    <div id="default-highlight" appHighlight>Default Color</div>
    <div id="custom-highlight" appHighlight highlightColor="rgb(0, 0, 255)">Custom Color</div>
    <div id="no-highlight">No Directive</div>
  `
})
class TestHostComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let de: DebugElement;
  let defaultHighlight: HTMLDivElement;
  let customHighlight: HTMLDivElement;
  let noHighlight: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TestHostComponent ],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    de = fixture.debugElement;
    fixture.detectChanges();

    defaultHighlight = de.query(By.css('#default-highlight')).nativeElement;
    customHighlight = de.query(By.css('#custom-highlight')).nativeElement;
    noHighlight = de.query(By.css('#no-highlight')).nativeElement;
  });

  it('Should have found all elements', () => {
    expect(defaultHighlight).toBeTruthy();
    expect(customHighlight).toBeTruthy();
    expect(noHighlight).toBeTruthy();
  });

  it('Should highlight when mouse over, clear when mouse leaves', () => {
    defaultHighlight.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(defaultHighlight.style.backgroundColor).toBe('rgb(0, 128, 0)');

    defaultHighlight.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();
    expect(defaultHighlight.style.backgroundColor).toBe('');
  });
});
