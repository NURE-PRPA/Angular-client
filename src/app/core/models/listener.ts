import {User} from "./user";

export class Listener extends User {
  public banCount: number = 0;
  public subscriptions: any = [];
  public bans: any = [];
}
