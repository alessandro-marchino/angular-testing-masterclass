import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';
import { CoursePage } from '../course-page/course-page';
import { provideRouter, Router } from '@angular/router';
import { courseResolver } from './course.resolver';
import { RouterTestingHarness } from '@angular/router/testing';
import { MOCK_COURSES } from '../testing/testing-data';

describe('CourseResolver', () => {
  let mockCoursesService: Partial<Mocked<CoursesService>>
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

  it('Should load correct route by id', async () => {
    mockCoursesService.findCourseById?.mockResolvedValueOnce(MOCK_COURSES[0]);
    const component = await harness.navigateByUrl('/courses/1', CoursePage);
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/courses/1');
    expect(mockCoursesService.findCourseById).toHaveBeenCalledOnce();
    expect(mockCoursesService.findCourseById).toHaveBeenLastCalledWith('1');

    expect(component.course()).toEqual(MOCK_COURSES[0]);
    expect(harness.routeNativeElement?.textContent).toContain('Beginner Course');
  })
});
