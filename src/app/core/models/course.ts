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

export class Course {
  id: number = 0;
  name: string = '';
  description: string = '';
  difficulty: CourseDifficulty = CourseDifficulty.None;
  price: number = 0;
  topic: number = 0;
  lecturer: Lecturer | null = null;
  modules: any = [];
  subscriptions: any = [];
}
