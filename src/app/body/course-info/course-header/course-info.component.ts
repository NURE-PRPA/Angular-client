import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Course} from "../../../core/models/course";
import {Response} from "../../../core/models/Response";
import {OperationResult} from "../../../core/models/OperationResult";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  // styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  courseId: string | null = null;
  currentCourse: Course | null = null;
  courseLoading: boolean = true;
  constructor(private currentRoute: ActivatedRoute, private _http: HttpClient) {}
  ngOnInit() {
    this.courseId = this.currentRoute.snapshot.paramMap.get('id');
    this._http.get<Response<Course>>(`http://localhost:5233/api/courses/${this.courseId}`).subscribe(
      (resonse) => {
        if (resonse.status == OperationResult.OK) {
          this.currentCourse = resonse.content;
          this.courseLoading = false;
        }
      }
    );
  }
}
