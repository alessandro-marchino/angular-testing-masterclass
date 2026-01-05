import {Component, OnInit, signal} from '@angular/core';
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {sortCoursesBySeqNo} from './sort-course-by-seq';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {

  beginnerCourses = signal<Course[]>([]);
  advancedCourses = signal<Course[]>([]);

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    this.coursesService.findAllCourses()
      .subscribe(courses => {
        this.beginnerCourses.set(this.filterByCategory(courses, 'BEGINNER'));
        this.advancedCourses.set(this.filterByCategory(courses, 'ADVANCED'));
      });
  }

  filterByCategory(courses: Course[], category: string) {
    return courses.filter(course => course.category === category).sort(sortCoursesBySeqNo);
  }

}


