import {Lecturer} from "./lecturer";

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
  difficulty: number = 0;
  price: number = 0;
  topic: number = 0;
  lecturer: Lecturer | null = null;
  modules: any = [];
  subscriptions: any = [];
}
