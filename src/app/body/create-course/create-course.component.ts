import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Course} from "../../core/models/course";
import {Topics} from "../../core/models/course";
import {Difficulties} from "../../core/models/course";
import {Test} from "../../core/models/test";
import {Module} from "../../core/models/module";
import {Response} from "../../core/models/Response";
import {Organization} from "../../core/models/organization";
import {OperationResult} from "../../core/models/OperationResult";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})



export class CreateCourseComponent implements OnInit {
  courseForm!: FormGroup;
  topics: string[] | null = null;
  difficulties: string[] | null = null;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.topics = ["Programming", "Calculus", "Physics", "Chemistry", "English", "Geography"];
    this.difficulties = ["Beginner", "Intermediate", "Advanced"];

    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      difficulty: '',
      price: [0],
      topic: '',
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
      // Save or submit the course data
      console.log(course);
    }
  }
}
