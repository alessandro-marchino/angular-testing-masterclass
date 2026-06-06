import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Courses } from './courses';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CoursesService } from '../services/courses.service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MOCK_COURSES } from '../testing/testing-data';
import { By } from '@angular/platform-browser';

import { TabsHarness } from '../tabs/tabs.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('CoursesController', () => {
  let component: Courses;
  let fixture: ComponentFixture<Courses>;
  let de: DebugElement;
  let httpMock: HttpTestingController;
  let tabs: TabsHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ Courses ],
      providers: [
        CoursesService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Courses);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    httpMock = TestBed.inject(HttpTestingController);

    const loader = TestbedHarnessEnvironment.loader(fixture);
    tabs = await loader.getHarness(TabsHarness);

    fixture.detectChanges();
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('Should load courses and filter by category', async () => {
    const req = httpMock.expectOne('/api/courses');
    req.flush({ payload: MOCK_COURSES });
    await fixture.whenStable();
    fixture.detectChanges();

    const titles = de.queryAll(By.css('.course-card .card-header'));
    expect(titles).toHaveLength(1);

    const titleEl = titles[0].nativeElement;
    expect(titleEl.textContent).toBe('Beginner Course');

    expect(await tabs.getTabLabels()).toEqual(['Beginner', 'Advanced']);
    expect(await tabs.getActiveLabel()).toEqual('Beginner')
  });

  it('Should show advanced courses when tab clicked', async () => {
    const req = httpMock.expectOne('/api/courses');
    req.flush({ payload: MOCK_COURSES });
    await fixture.whenStable();

    await tabs.clickTabByIndex(1);

    const titles = de.queryAll(By.css('.course-card .card-header'));
    expect(titles).toHaveLength(1);

    const titleEl = titles[0].nativeElement;
    expect(titleEl.textContent).toBe('Advanced Course');
  });
});
