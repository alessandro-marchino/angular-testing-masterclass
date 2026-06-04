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

describe('CoursesController', () => {
  let component: Courses;
  let fixture: ComponentFixture<Courses>;
  let de: DebugElement;
  let httpMock: HttpTestingController;

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
  });

  it('Should show advanced courses when tab clicked', async () => {
    const req = httpMock.expectOne('/api/courses');
    req.flush({ payload: MOCK_COURSES });
    await fixture.whenStable();

    const btn = de.query(By.css('.tab-link:last-child'));
    btn.nativeElement.click();
    fixture.detectChanges();

    const titles = de.queryAll(By.css('.course-card .card-header'));
    expect(titles).toHaveLength(1);

    const titleEl = titles[0].nativeElement;
    expect(titleEl.textContent).toBe('Advanced Course');
  });
});
