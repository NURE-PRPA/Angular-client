import {Lecturer} from "./lecturer";
import {CourseDifficulty} from "./CourseDifficulty";

//export class User {
  //id: number = 0;
  //name: string = '';
  //description: string = '';
  //difficulty: number = 0;
  //topic: string = '';
  //lecturer: Lecturer;
  //googleId: number = 0;
  //password: string = '';
//}

export const Topics: Record<number, string> = {
  0 : "None",
  1 : "Programming",
  2 : "Calculus",
  3 : "Physics",
  4 : "Chemistry",
  5 : "English",
  6 : "Geography"
};

export const Difficulties: Record<number, string> = {
  0 : "None",
  1 : "Beginner",
  2 : "Integmediate",
  3 : "Advanced"
};

export class Course {
  id: number = 0;
  name: string = '';
  description: string = '';
  difficulty: number = 0;
  price: number = 0;
  topic: number = 0;
  lecturer: Lecturer | null = null;
  modules: any = [];
  subscriptions: any = [];
}
