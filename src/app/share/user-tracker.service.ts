import {Injectable} from '@angular/core';
import {User} from "../core/models/user";
import {Subject} from "rxjs";
import {Listener} from "../core/models/listener";
import {Lecturer} from "../core/models/lecturer";

@Injectable({
  providedIn: 'root'
})
export class UserTrackerService {
  private _user: User | Listener | Lecturer | null | undefined = undefined;
  private _notifier = new Subject<User | Listener | null | undefined>();

  setUser(user: User | Listener | Lecturer | null) {
    if (user == null)
      return;

    this._user = user;
    this._notifier.next(this._user);
  }

  get User() {
    return this._user;
  }

  unSet(): void {
    this._user = undefined;
    this._notifier.next(undefined);
  }

  userChange() {
    return this._notifier;
  }
}
