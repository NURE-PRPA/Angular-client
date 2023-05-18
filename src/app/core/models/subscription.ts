import {Listener} from "./listener";
import {Course} from "./course";

export class Subscription {
  id: string = '';
  isActive: boolean = false;
  listener: Listener | null = null;
  course: Course | null = null;
}
