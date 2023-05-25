import {Component, OnInit} from '@angular/core';
import {Course} from "../../core/models/course";
import {Topics} from "../../core/models/course";
import {Difficulties} from "../../core/models/course";
import {HttpClient} from "@angular/common/http";
import {Response} from "../../core/models/Response";
import {OperationResult} from "../../core/models/OperationResult";
import {Organization} from "../../core/models/organization";

@Component({
  selector: 'app-browse-courses',
  templateUrl: './browse-courses.component.html',
  styleUrls: ['./browse-courses.component.scss']
})
export class BrowseCoursesComponent implements OnInit {
  courses: Course[] | null | undefined = [];
  filteredCourses: Course[] | undefined = [];
  coursesLoading: boolean = true;
  topicFilters: string[] = ['1', '2', '3', '4', '5', '6'];
  difficulties: string[] = ['1', '2', '3'];
  topics: Record<number, string> = Topics;
  difficultiesNames: Record<number, string> = Difficulties;

  public backgrounds: Record<number, string> = {
    1 : 'assets/courses/course-background-purple.png',
    2 : 'assets/courses/course-background-orange.png',
    3 : 'assets/courses/course-background-red.png',
    4 : 'assets/courses/course-background-blue.png',
    5 : 'assets/courses/course-background-yellow.png',
    6 : 'assets/courses/course-background-green.png',
  }


  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
    this._http
      .get<Response<Course[]>>('https://quantedapi.azurewebsites.net/api/courses/all', {withCredentials: true})
      .subscribe(
        (response) => {
          if (response.status == OperationResult.OK) {
            this.courses = response.content ?? [];
            this.coursesLoading = false;
            this.filteredCourses = this.courses ?? [];
            console.log(this.courses);
          }
        }
      );
  }

  filterCourses() {
    this.filteredCourses = this.courses?.filter(course => {
      return this.topicFilters.indexOf(course.topic.toString()) !== -1 &&
      this.difficulties.indexOf(course.difficulty.toString()) !== -1
    });
  }


  onTopicFilter(element: HTMLInputElement) {
    if (element.checked) {
      this.topicFilters.push(element.value);
    } else if (!element.checked) {
      var index: number = this.topicFilters.indexOf(element.value.toString());

      if (index !== -1) {
        this.topicFilters.splice(index, 1);
      }
    }

    this.filterCourses();

    console.log(this.filteredCourses);
  }

  onDifficultyChange(element: HTMLInputElement) {
    if (element.checked) {
      this.difficulties.push(element.value);
    } else if (!element.checked) {
      var index: number = this.difficulties.indexOf(element.value);

      if (index !== -1) {
        this.difficulties.splice(index, 1);
      }
    }

    this.filterCourses();

    console.log(this.filteredCourses);
  }
}
