import {User} from "./user";

export class Listener extends User {
  readonly userType:string = 'listener';
  public banCount: number = 0;
  public subscriptions: any = [];
  public bans: any = [];
}
