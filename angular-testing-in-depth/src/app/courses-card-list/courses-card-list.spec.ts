import { beforeEach, describe, expect, it } from 'vitest';
import { CoursesCardList } from './courses-card-list';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MOCK_COURSES } from '../testing/testing-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CoursesDialog } from '../courses-dialog/courses-dialog';

describe('CoursesCardList', () => {
  let component: CoursesCardList;
  let fixture: ComponentFixture<CoursesCardList>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesCardList, CoursesDialog ],
      providers: [ provideRouter([]) ]
    }).compileComponents();
    fixture = TestBed.createComponent(CoursesCardList);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.componentRef.setInput('courses', MOCK_COURSES);
    fixture.detectChanges();
  });

  it('Should create the CourseCardListComponent', () => {
    expect(component).toBeDefined();
  });

  it('Should display the course list', () => {
    const cardTitles = de.queryAll(By.css('.course-card .card-header'));
    expect(cardTitles.length).toBe(2);
    const titleEl = cardTitles[0].nativeElement;
    expect(titleEl.textContent).toBe('Beginner Course')
  });

  it('Should display message when no courses', () => {
    fixture.componentRef.setInput('courses', []);
    fixture.detectChanges();

    const msg = de.query(By.css('.no-courses'));
    expect(msg).toBeTruthy();
    expect(msg.nativeElement.textContent).toContain('No courses found');
  });

  it('Should open dialog when clicking the edit button', () => {
    const btn = de.query(By.css('.course-card:first-child .edit-btn'));
    btn.nativeElement.click();
    fixture.detectChanges();

    const form = document.querySelector('.course-form');
    expect(form, 'The edit course form should be visible').toBeTruthy();
  });
});
