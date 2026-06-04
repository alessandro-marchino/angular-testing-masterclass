import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CoursePage } from './course-page';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { getMockLessonsPage, MOCK_COURSES } from '../testing/testing-data';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute } from '@angular/router';

const FIRST_PAGE = getMockLessonsPage(1, '', 'asc', 0, 3);
const SECOND_PAGE = getMockLessonsPage(1, '', 'asc', 1, 3);
const SEARCH_RESULTS = getMockLessonsPage(1, 'Lesson 20', 'asc', 0, 3);

describe('CoursePage', () => {
  let component: CoursePage;
  let fixture: ComponentFixture<CoursePage>;
  let de: DebugElement;
  let mockCoursesService: any;

  beforeEach(async () => {
    mockCoursesService = {
      findLessons: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ CoursePage ],
      providers: [
        { provide: CoursesService, useValue: mockCoursesService },
        { provide: ActivatedRoute, useValue: { snapshot: { data: { course: MOCK_COURSES[0] } } }}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursePage);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    // httpMock = TestBed.inject(HttpTestingController);
    // fixture.detectChanges();
  });
  // afterEach(() => {
  //   httpMock.verify();
  // });

  it('Should load lessons on init', async () => {
  });
});
