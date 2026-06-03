import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { HelloWorld } from './hello-world';
import { DebugElement } from '@angular/core';

describe('HelloWorld', () => {
  let fixture: ComponentFixture<HelloWorld>;
  let de: DebugElement;
  let el: HTMLElement;
  let component: HelloWorld;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HelloWorld ]
    }).compileComponents();
    fixture = TestBed.createComponent(HelloWorld);
    de = fixture.debugElement;
    el = de.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('Should create the component', () => {
    expect(fixture.componentInstance).toBeDefined();
  });
  it('Should display the message', () => {
    const h1 = el.querySelector('h1');
    expect(h1).toBeDefined();
    expect(h1?.textContent).toEqual(component.message);
  });
});
