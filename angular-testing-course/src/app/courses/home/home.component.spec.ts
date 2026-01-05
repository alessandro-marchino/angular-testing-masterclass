import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { DebugElement } from "@angular/core";
import { CoursesModule } from "../courses.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { CoursesService } from "../services/courses.service";
import { of } from "rxjs";
import { setupCourses } from "../common/setup-test-data";
import { By } from "@angular/platform-browser";

describe('HomeComponent', () => {

  let coursesServiceSpy: jasmine.SpyObj<CoursesService>;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    coursesServiceSpy = jasmine.createSpyObj<CoursesService>('CoursesService', ['findAllCourses']);
    console.log(coursesServiceSpy.findAllCourses);
    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy },
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('Should display only beginner courses', () => {
    coursesServiceSpy.findAllCourses.and.returnValue(of(setupCourses().filter(c => c.category === 'BEGINNER')));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab__text-label'));
    expect(tabs.length).toBe(1, 'Unexpected number of tabs found');
  });
  it('Should display only advanced courses', () => {
    coursesServiceSpy.findAllCourses.and.returnValue(of(setupCourses().filter(c => c.category === 'ADVANCED')));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab__text-label'));
    expect(tabs.length).toBe(1, 'Unexpected number of tabs found');
  });
  it('Should display both tabs', () => {
    coursesServiceSpy.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mdc-tab__text-label'));
    expect(tabs.length).toBe(2, 'Unexpected number of tabs found');
  });
  xit('Should display advanced courses when tab clicked', () => {});
});
