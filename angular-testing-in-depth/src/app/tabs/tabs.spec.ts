import { beforeEach, describe, expect, it } from 'vitest';
import { TabsComponent } from './tabs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabData } from './tabs.model';
import { MOCK_TABS } from '../testing/testing-data';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  const mockTabs: TabData[] = MOCK_TABS;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TabsComponent);
    fixture.componentRef.setInput('tabs', mockTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('Should create the TabComponent', () => {
    expect(component).toBeDefined();
  });
});
