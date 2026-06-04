import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { CoursePage } from './course-page';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { getMockLessonsPage, MOCK_COURSES } from '../testing/testing-data';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute } from '@angular/router';

import { getTableContent } from '../testing/testing-utils';

const FIRST_PAGE = getMockLessonsPage(1, '', 'asc', 0, 3);
const SECOND_PAGE = getMockLessonsPage(1, '', 'asc', 1, 3);
const SEARCH_RESULTS = getMockLessonsPage(1, 'Lesson 20', 'asc', 0, 3);

describe('CoursePage', () => {
  let component: CoursePage;
  let fixture: ComponentFixture<CoursePage>;
  let de: DebugElement;
  let mockCoursesService: { findLessons: Mock };

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
  });

  it('Should load lessons on init', async () => {
    mockCoursesService.findLessons.mockReturnValueOnce(FIRST_PAGE);
    await fixture.whenStable();
    expect(mockCoursesService.findLessons).toHaveBeenCalledWith(1, '', 'asc', 0, 3);

    const lessons = getTableContent(de, 'tbody tr td.description-cell');
    expect(lessons).toHaveLength(3);
    expect(lessons[0]).toBe("Lesson 1");
    expect(lessons[1]).toBe("Lesson 2");
    expect(lessons[2]).toBe("Lesson 3");
  });
});
