import {Component, OnInit} from '@angular/core';
import {Course, Difficulties, Topics} from "../../../core/models/course";
import {Module} from "../../../core/models/module";
import {Certificate} from "../../../core/models/certificate";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Response} from "../../../core/models/Response";
import {OperationResult} from "../../../core/models/OperationResult";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-modules',
  templateUrl: './create-modules.component.html',
  styleUrls: ['./create-modules.component.scss']
})
export class CreateModulesComponent implements OnInit {
  courseId: string | null = null;
  courseForm!: FormGroup;
  constructor(private currentRoute: ActivatedRoute, private _http: HttpClient, private formBuilder: FormBuilder, private _router: Router) {}
  ngOnInit() {
    this.courseId = this.currentRoute.snapshot.paramMap.get('id');
    this._http.get<Response<Course>>(`http://localhost:5233/api/courses/${this.courseId}`, {withCredentials: true}).subscribe(
      (response) => {
        if (response.status == OperationResult.OK) {

        }
      }
    );
    this.courseForm = this.formBuilder.group({
      modules: this.formBuilder.array([])
    });
  }

  get moduleGroups() {
    return this.courseForm.get('modules') as FormArray;
  }

  addModule() {
    const moduleGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      estimate: [0]
    });

    this.moduleGroups.push(moduleGroup);
  }

  removeModule(index: number) {
    this.moduleGroups.removeAt(index);
  }

  onSubmit() {
    console.log(this.courseForm.value);
    if (this.courseForm.valid) {
      const course: Course = this.courseForm.value;
      for(let i = 0; i < (course.modules?.length ?? 0); i++){
        console.log(course.modules?.[i])
        if(course.modules){
          course.modules[i].id = '';
          course.modules[i].contentContainers = [];
          course.modules[i].courseId = this.courseId;
          course.modules[i].position = i + 1;
        }
        this._http.post<Response<Module | null>>(`http://localhost:5233/api/modules/add`, course.modules?.[i], {withCredentials: true}).subscribe
        ( async (response) => {

        }, (error: HttpErrorResponse) => {
          console.log(error);
        });
      }

      this._router.navigateByUrl('my/courses/create/tests/' + this.courseId);
    }
  }
}
