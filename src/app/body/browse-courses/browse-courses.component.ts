import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseStorage} from "../../core/storage";
import {Course} from "../../core/models/course";
import {HttpClient} from "@angular/common/http";
import {Response} from "../../core/models/Response";
import {OperationResult} from "../../core/models/OperationResult";

@Component({
  selector: 'app-browse-courses',
  templateUrl: './browse-courses.component.html',
  styleUrls: ['./browse-courses.component.scss']
})
export class BrowseCoursesComponent implements OnInit {
  courses: Course[] | null = [];
  public coursesLoading: boolean = true;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
    console.log('making request...')
    this._http
      .get<Response<Course[]>>('http://localhost:5233/api/courses/all')
      .subscribe(
        (response) => {
          if (response.status == OperationResult.OK) {
            this.courses = response.content;
            this.coursesLoading = false;
            console.log(this.courses);
          }
        }
      );
  }
}
