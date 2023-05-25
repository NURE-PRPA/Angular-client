import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Course} from "../../../core/models/course";
import {Topics} from "../../../core/models/course";
import {Difficulties} from "../../../core/models/course";
import {Test} from "../../../core/models/test";
import {Module} from "../../../core/models/module";
import {Response} from "../../../core/models/Response";
import {Organization} from "../../../core/models/organization";
import {OperationResult} from "../../../core/models/OperationResult";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserTrackerService} from "../../../share/user-tracker.service";
import {Router} from "@angular/router";
import {Lecturer} from "../../../core/models/lecturer";
import {User} from "../../../core/models/user";
import {Listener} from "../../../core/models/listener";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})



export class CreateCourseComponent implements OnInit {
  courseForm!: FormGroup;
  topics: string[] | null = null;
  difficulties: string[] | null = null;

  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private _router: Router) { }

  ngOnInit() {
    this.topics = ["Programming", "Calculus", "Physics", "Chemistry", "English", "Geography"];
    this.difficulties = ["Beginner", "Intermediate", "Advanced"];

    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      difficulty: '',
      price: [0],
      topic: ''
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      let topic = this.courseForm.value.topic;
      let difficulty = this.courseForm.value.difficulty;
      console.log(topic);
      console.log(this.topics?.indexOf(topic));
      const course: Course = this.courseForm.value;
      course.id = '';
      course.modules = [];
      course.isAcquired = false;
      course.progress = 0;
      course.subscriptions = [];
      course.topic = (this.topics?.indexOf(topic) ?? -1) + 1;
      course.difficulty = (this.difficulties?.indexOf(difficulty) ?? -1) + 1;

      this._http.get<Response<User | Listener | Lecturer>>('https://quantedapi.azurewebsites.net/api/profile/me/info', {
        withCredentials: true
      }).subscribe(
        (response) => {
          course.lecturer = response.content as Lecturer;
          // if (course.lecturer.organization && course.lecturer.organization.lecturers) {
          //   course.lecturer.organization.lecturers = [];
          //   console.log("----------");
          // }
          // console.log("dfksjfldfkjdk");
          console.log(course.lecturer);
        },
        undefined,
        () => {
          console.log(course);
          this._http.post<Response<Course | null>>(`https://quantedapi.azurewebsites.net/api/courses/add`, course, {withCredentials: true}).subscribe
          ( async (response) => {
            let courseId = response.content?.id;

            await this._router.navigateByUrl('my/courses/create/modules/' + courseId);
          }, (error: HttpErrorResponse) => {
            console.log(error);
          });

        }
      );
    }
  }
}
