import {Subscription} from "./subscription";
import {Timestamp} from "rxjs";

export class Certificate {
  id: string = '';
  date: string | number | Date = '';
  mark: number = 0;
  subscription: Subscription | null = null;
}
