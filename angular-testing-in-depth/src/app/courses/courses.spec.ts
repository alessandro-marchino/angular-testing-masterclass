import { beforeEach, describe, expect, it } from 'vitest';
import { Courses } from './courses';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CoursesService } from '../services/courses.service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('CoursesController', () => {
  let component: Courses;
  let fixture: ComponentFixture<Courses>;
  let de: DebugElement;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ Courses ],
      providers: [
        CoursesService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Courses);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('Should create the CoursesController', () => {
    expect(component).toBeDefined();
  });

  it('Should load courses and filtered by category', () => {});
  it('Should show advanced courses when tab clicked', () => {});
});
