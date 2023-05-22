import {Component, OnInit} from '@angular/core';
import {Course, Difficulties, Topics} from "../../../core/models/course";
import {Module} from "../../../core/models/module";
import {Certificate} from "../../../core/models/certificate";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Response} from "../../../core/models/Response";
import {OperationResult} from "../../../core/models/OperationResult";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContentContainer} from "../../../core/models/contentContainer";

@Component({
  selector: 'app-create-modules',
  templateUrl: './create-modules.component.html',
  styleUrls: ['./create-modules.component.scss']
})
export class CreateModulesComponent implements OnInit {
  courseId: string | null = null;
  courseForm!: FormGroup;
  contentContainers: ContentContainer[] = [];
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
          // for(let i = 0; i < this.contentContainers.length; i++){
          //   console.log(this.contentContainers[i].modulePosition + ' - ' + response.content?.position);
          //   console.log(this.contentContainers[i]);
          //   const jsonContentContainer = JSON.stringify(this.contentContainers[i]);
          //   fetch('http://localhost:5233/api/containers/add', {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json'
          //     },
          //     body: jsonContentContainer
          //   })
          //     .then(response => {
          //       // Handle the response
          //     })
          //     .catch(error => {
          //       // Handle any errors
          //     });
          //
          //   // if(this.contentContainers[i].modulePosition + 1 === response.content?.position){
          //   //   this.sendContentContainerToBackend(this.contentContainers[i]);
          //   // }
          // }
        }, (error: HttpErrorResponse) => {
          console.log(error);
        });
      }

      this._router.navigateByUrl('my/courses/create/tests/' + this.courseId);
    }
  }

  // handleFileInput(files: FileList): void {
  //   if (files && files.length > 0) {
  //     const file: File = files[0];
  //     this.convertFileToBytes(file);
  //   }
  // }
  // handleFileInput(event: Event, index: number): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     const file: File = inputElement.files[0];
  //     this.convertFileToBytes(file, index);
  //   }
  //
  //   console.log(index);
  // }
  //
  // convertFileToBytes(file: File, index: number): void {
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     const fileBytes = new Uint8Array(reader.result as ArrayBuffer);
  //
  //     let contentContainer = new ContentContainer();
  //     contentContainer.name = file.name;
  //     contentContainer.binary = fileBytes;
  //     contentContainer.modulePosition = index;
  //     this.contentContainers.push(contentContainer);
  //     //console.log(this.contentContainers);
  //
  //     // Do something with the contentContainer object
  //   };
  //   reader.readAsArrayBuffer(file);
  //
  //   console.log(this.contentContainers);
  // }
  handleFileInput(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0];
      this.convertFileToBytes(file, index);
    }
  }

  convertFileToBytes(file: File, index: number): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileBytes = new Uint8Array(reader.result as ArrayBuffer);

      let contentContainer = new ContentContainer();
      contentContainer.name = file.name;
      //contentContainer.binary = fileBytes;
      contentContainer.binary = this.encodeFileToBase64(fileBytes);
      contentContainer.modulePosition = index;
      this.contentContainers.push(contentContainer);

      this.sendContentContainerToBackend(contentContainer);
    };
    reader.readAsArrayBuffer(file);
  }

  encodeFileToBase64(fileBytes: Uint8Array): string {
    const binaryString = Array.from(fileBytes).map((byte) => String.fromCharCode(byte)).join('');
    return btoa(binaryString);
  }

  sendContentContainerToBackend(contentContainer: ContentContainer): void {
    // Assuming you're using Angular's HttpClient to send the data
    this._http.post<Response<ContentContainer | null>>('http://localhost:5233/api/containers/add', contentContainer, {withCredentials: true})
      .subscribe(
        (response) => {
          // Handle response from the backend
        },
        (error) => {
          // Handle error
        }
      );
  }
}
