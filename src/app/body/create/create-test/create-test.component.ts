import {Component, OnInit} from '@angular/core';
import {Course} from "../../../core/models/course";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Response} from "../../../core/models/Response";
import {OperationResult} from "../../../core/models/OperationResult";
import {Module} from "../../../core/models/module";
import {Question} from "../../../core/models/question";
import {Test} from "../../../core/models/test";
import {Answer} from "../../../core/models/answer";

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})

export class CreateTestComponent implements OnInit {
  courseId: string | null | undefined = null;
  moduleId: string | null = null;
  module: Module | null = null;
  test!: Test;
  testForm!: FormGroup;
  // course: Course | null = null;
  constructor(private currentRoute: ActivatedRoute, private _http: HttpClient, private formBuilder: FormBuilder, private _router: Router) {}
  ngOnInit() {
    this.moduleId = this.currentRoute.snapshot.paramMap.get('id');
    this._http.get<Response<Module>>(`http://localhost:5233/api/modules/${this.moduleId}`, {withCredentials: true}).subscribe(
      (response) => {
        if (response.status == OperationResult.OK) {
          this.courseId = response.content?.courseId;
          this.module = response.content;
        }
      }
    );

    this.test = new Test();
    this.test.duration = 1;

    // this.testForm = this.formBuilder.group({
    //   id: [''],
    //   name: ['', Validators.required],
    //   duration: [0, Validators.min(0)],
    //   questions: this.formBuilder.array([])
    // });
  }

  addQuestion() {
    this.test.questions.push(new Question());
  }

  removeQuestion(questionIndex: number) {
    this.test.questions.splice(questionIndex, 1);
  }

  addAnswer(questionIndex: number) {
    this.test.questions[questionIndex].answers.push(new Answer());
  }

  removeAnswer(questionIndex: number, answerIndex: number) {
    this.test.questions[questionIndex].answers.splice(answerIndex, 1);
  }

  onSubmit() {
    this.test.userAttempts = [];
    this.test.id = '';
    this.test.moduleId = this.moduleId;

    this._router.navigateByUrl('my/courses/create/tests/' + this.courseId);
    this._http.post<Response<Course | null>>(`http://localhost:5233/api/tests/add`, this.test, {withCredentials: true}).subscribe
    ( async (response) => {
      await this._router.navigateByUrl('my/courses/create/tests/' + this.courseId);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
}
