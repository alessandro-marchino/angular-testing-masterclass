import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { CoursesService } from '../services/courses.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CoursesDialog } from './courses-dialog';
import { MOCK_COURSES } from '../testing/testing-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CoursesDialog', () => {
  let mockCoursesService: Partial<CoursesService>;
  let mockDialogRef: Partial<DialogRef>;

  let component: CoursesDialog;
  let fixture: ComponentFixture<CoursesDialog>;
  let de: DebugElement;

  beforeEach(async () => {
    mockCoursesService = {
      saveCourse: vi.fn()
    };
    mockDialogRef = {
      close: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ CoursesDialog ],
      providers: [
        { provide: CoursesService, useValue: mockCoursesService },
        { provide: DialogRef, useValue: mockDialogRef },
        { provide: DIALOG_DATA, useValue: { course: MOCK_COURSES[0] } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CoursesDialog);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('Should initialize the form with course data', () => {
    expect(component.courseForm.description().value()).toBe('Beginner Course');
    expect(component.courseForm.category().value()).toBe('BEGINNER');
    expect(component.courseForm.releasedAt().value()).toBe(new Date().toLocaleDateString('en-CA'));
    expect(component.courseForm.longDescription().value()).toBe('Theory');

    expect(component.courseForm().valid()).toBe(true);
  });

  it('Should handle description error', () => {
    component.courseForm.description().value.set('');
    component.courseForm.description().markAsTouched();
    fixture.detectChanges();

    const errorList = de.query(By.css('.description .error-list'));
    expect(errorList).toBeTruthy();
    expect(errorList.nativeElement.textContent).toContain('Description is required');

    const saveButton = de.query(By.css('.btn-primary')).nativeElement as HTMLButtonElement;
    expect(saveButton.disabled).toBe(true)
  });
});
