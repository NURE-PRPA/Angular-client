import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Course, Difficulties, Topics} from "../../../core/models/course";
import {Response} from "../../../core/models/Response";
import {OperationResult} from "../../../core/models/OperationResult";
import {Module} from "../../../core/models/module";
import {Time} from "@angular/common";
import {User} from "../../../core/models/user";
import {Listener} from "../../../core/models/listener";
import {Organization} from "../../../core/models/organization";
import {Certificate} from "../../../core/models/certificate";
import {Lecturer} from "../../../core/models/lecturer";



@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  public backgrounds: Record<number, string> = {
    1 : 'assets/courses/course-background-purple.png',
    2 : 'assets/courses/course-background-orange.png',
    3 : 'assets/courses/course-background-red.png',
    4 : 'assets/courses/course-background-blue.png',
    5 : 'assets/courses/course-background-yellow.png',
    6 : 'assets/courses/course-background-green.png',
  }


  courseId: string | null = null;
  currentCourse: Course | null = null;
  courseLoading: boolean = true;
  currentModule: Module | null | undefined = null;
  topics: Record<number, string> = Topics;
  difficultiesNames: Record<number, string> = Difficulties;
  estimate: number = 0;
  certificate: Certificate | null = null;
  isLecturer: boolean = false;
  constructor(private currentRoute: ActivatedRoute, private _http: HttpClient) {}
  ngOnInit() {
    this.courseId = this.currentRoute.snapshot.paramMap.get('id');
    this._http.get<Response<Course>>(`https://quantedapi.azurewebsites.net/api/courses/${this.courseId}`, {withCredentials: true}).subscribe(
      (response) => {
        if (response.status == OperationResult.OK) {
          this.currentCourse = response.content;
          this.courseLoading = false;

          let count: number = this.currentCourse?.modules?.length ?? 0;
          for(let i = 0; i < count; i++){
            this.estimate += this.currentCourse?.modules?.[i].estimate ?? 0;
          }
          this.currentCourse?.modules?.sort((a, b) => a.position - b.position);

          console.log(this.currentCourse?.progress);
        }
      }
    );

    this._http.get<Response<Certificate>>(`https://quantedapi.azurewebsites.net/api/certificates/course/${this.courseId}`, {withCredentials: true}).subscribe(
      (response) => {
        if (response.status == OperationResult.OK) {
          this.certificate = response.content;
        }
      }
    );

    this._http.get<Response<object | null>>(`https://quantedapi.azurewebsites.net/api/profile/me/type`, {withCredentials: true}).subscribe(
      (response) => {
        if (response.status == OperationResult.OK) {
          this.isLecturer = response.messages?.[0] == "lecturer";
        }
      }
    );
  }

  onModuleChange(element: HTMLInputElement) {
    if (element.checked) {
      var modules = this.currentCourse?.modules?.filter(module => {
        return module.id == element.value
      });

      if(modules !== undefined){
        this.currentModule = modules[0];
      }
    } else if (!element.checked) {
      // var index: number = this.topicFilters.indexOf(element.value.toString());
      //
      // if (index !== -1) {
      //   this.topicFilters.splice(index, 1);
      // }
    }

    // this.filterCourses();

    // console.log(this.filteredCourses);
  }

  enroll() {
    this._http.post<Response<object | null>>(`https://quantedapi.azurewebsites.net/api/courses/enroll/${this.courseId}`, {}, { withCredentials: true }).subscribe
    ( (response) => {
      if (this.currentCourse) {
        this.currentCourse.isAcquired = true;
      }

      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }
}
