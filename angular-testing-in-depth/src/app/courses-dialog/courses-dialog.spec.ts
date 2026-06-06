import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, Mock, vi } from 'vitest';
import { CoursesService } from '../services/courses.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CoursesDialog } from './courses-dialog';
import { MOCK_COURSES } from '../testing/testing-data';
import { DebugElement } from '@angular/core';

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

  it('', () => {})
});
