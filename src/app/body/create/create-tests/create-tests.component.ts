import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Response} from "../../../core/models/Response";
import {Course} from "../../../core/models/course";
import {OperationResult} from "../../../core/models/OperationResult";

@Component({
  selector: 'app-create-tests',
  templateUrl: './create-tests.component.html',
  styleUrls: ['./create-tests.component.scss']
})

export class CreateTestsComponent implements OnInit {
  courseId: string | null = null;
  course: Course | null = null;
  constructor(private currentRoute: ActivatedRoute, private _http: HttpClient, private formBuilder: FormBuilder, private _router: Router) {}
  ngOnInit() {
    this.courseId = this.currentRoute.snapshot.paramMap.get('id');
    this._http.get<Response<Course>>(`https://quantedapi.azurewebsites.net/api/courses/${this.courseId}`, {withCredentials: true}).subscribe(
      (response) => {
        if (response.status == OperationResult.OK) {
          this.course = response.content;
          this.course?.modules?.sort((a, b) => a.position - b.position);
        }
      }
    );
  }

  addTest(moduleId: string | undefined){
    this._router.navigateByUrl('my/courses/create/test/' + moduleId);
  }

  submit(){
    this._router.navigateByUrl('my/courses/view/' + this.courseId);
  }
}
