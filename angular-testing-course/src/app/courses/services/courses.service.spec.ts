import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

fdescribe('CoursesService', () => {
  let service: CoursesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CoursesService,
      ]
    });
    service = TestBed.inject(CoursesService);
  })

  it('should retrieve all courses', () => {});
});
