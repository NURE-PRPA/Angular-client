import {Course} from "./course";
import {CourseDifficulty} from "./CourseDifficulty";
import {Time} from "@angular/common";


export class Module {
  id: string = '';
  name: string = '';
  description: string = '';
  course: Course | null = null;
  test: any = [];
  estimate: number = 0;
  position: number = 0;
}
