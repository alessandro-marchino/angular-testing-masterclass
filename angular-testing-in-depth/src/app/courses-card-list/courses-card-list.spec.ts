import { beforeEach, describe, expect, it } from 'vitest';
import { CoursesCardList } from './courses-card-list';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MOCK_COURSES } from '../testing/testing-data';

describe('CoursesCardList', () => {
  let component: CoursesCardList;
  let fixture: ComponentFixture<CoursesCardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesCardList ],
      providers: [ provideRouter([]) ]
    }).compileComponents();
    fixture = TestBed.createComponent(CoursesCardList);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('courses', MOCK_COURSES);
    fixture.detectChanges();
  });

  it('Should create the CourseCardListComponent', () => {
    expect(component).toBeDefined();
  });

  it('Should display the course list', () => {

  });
});
