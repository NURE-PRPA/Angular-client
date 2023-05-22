import {Course} from "./course";
import {CourseDifficulty} from "./CourseDifficulty";
import {Time} from "@angular/common";
import {Test} from "./test";
import {ContentContainer} from "./contentContainer";


export class Module {
  id: string = '';
  name: string = '';
  description: string = '';
  courseId: string | null = '';
  course: Course | null = null;
  estimate: number = 0;
  position: number = 0;
  test: Test | null = null;
  contentContainers: ContentContainer[] | null = [];
}
