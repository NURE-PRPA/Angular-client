import {Question} from "./question";
import {UserAttempt} from "./userAttempt";

export class Test {
  id: string = '';
  name: string = '';
  duration: number = 0;
  questions: Question[] = [];
  userAttempts: UserAttempt[] = [];
  moduleId: string | null = null;
}
