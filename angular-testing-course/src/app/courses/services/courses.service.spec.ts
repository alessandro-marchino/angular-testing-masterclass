import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { COURSES } from "../../../../server/db-data";

fdescribe('CoursesService', () => {
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
  })

  it('should retrieve all courses', () => {
    service.findAllCourses()
      .subscribe(courses => {
        console.log(courses)
        expect(courses).toBeTruthy('No courses returned');
        expect(courses.length).toBe(12, 'Incorrect number of courses');
        const course = courses.find(course => course.id === 12);
        expect(course.titles.description).toBe('Angular Testing Course');
      });

    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');
    req.flush({
      payload: Object.values(COURSES)
    });
  });
});
