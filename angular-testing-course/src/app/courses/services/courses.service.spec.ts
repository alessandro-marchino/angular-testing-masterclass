import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { HttpErrorResponse, provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { COURSES } from "../../../../server/db-data";
import { Course } from "../model/course";

describe('CoursesService', () => {
  let service: CoursesService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CoursesService,
      ]
    });
    service = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  })

  it('should retrieve all courses', () => {
    service.findAllCourses()
      .subscribe(courses => {
        expect(courses).toBeTruthy('No courses returned');
        expect(courses.length).toBe(12, 'Incorrect number of courses');
        const course = courses.find(course => course.id === 12);
        expect(course.titles.description).toBe('Angular Testing Course');
      });

    const req = httpTestingController.expectOne({ method: 'GET', url: '/api/courses' });
    expect(req.request.method).toEqual('GET');
    req.flush({
      payload: Object.values(COURSES)
    });
  });

  it('should retrieve a course by id', () => {
    service.findCourseById(12)
      .subscribe(course => {
        expect(course).toBeTruthy('No courses returned');
        expect(course.titles.description).toBe('Angular Testing Course');
        expect(course.id).toBe(12);
      });

    const req = httpTestingController.expectOne({ method: 'GET', url: '/api/courses/12' });
    expect(req.request.method).toEqual('GET');
    req.flush(COURSES[12]);
  });

  it('should save the course data', () => {
    const changes: Partial<Course> = { titles: { description: 'Testing Course' } };

    service.saveCourse(12, changes)
      .subscribe(course => {
        expect(course).toBeTruthy('No courses returned');
        expect(course.id).toBe(12);
        expect(course.titles.description).toBe(changes.titles.description);
      });

    const req = httpTestingController.expectOne({ method: 'PUT', url: '/api/courses/12' });
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.titles.description).toBe(changes.titles.description);
    req.flush({ ...COURSES[12], ...changes });
  });

  it('should should give an error if save course fails', () => {
    const changes: Partial<Course> = { titles: { description: 'Testing Course' } };

    service.saveCourse(12, changes)
      .subscribe({
        next: () => fail('The save course operation should have failed'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
        }
      });

    const req = httpTestingController.expectOne({ method: 'PUT', url: '/api/courses/12' });
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.titles.description).toBe(changes.titles.description);
    req.flush('Save course failed', { status: 500, statusText: 'Internal Server Error' });
  });
});
