import { beforeEach, describe, vi } from 'vitest';
import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';
import { CoursePage } from '../course-page/course-page';
import { provideRouter } from '@angular/router';
import { courseResolver } from './course.resolver';
import { RouterTestingHarness } from '@angular/router/testing';

describe('CourseResolver', () => {
  let mockCoursesService: Partial<CoursesService>;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    mockCoursesService = {
      findCourseById: vi.fn()
    };
    await TestBed.configureTestingModule({
      imports: [CoursePage],
      providers: [
        { provide: CoursesService, useValue: mockCoursesService },
        provideRouter([{
          path: 'courses/:id',
          component: CoursePage,
          resolve: {
            course: courseResolver
          }
        }])
      ]
    }).compileComponents();
    harness = await RouterTestingHarness.create();
  });
});
