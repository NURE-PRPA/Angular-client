import {Injectable} from '@angular/core';
import {CanActivate, Route, Router} from "@angular/router";
import {UserTrackerService} from "../user-tracker.service";
import {filter, map, Observable, pipe} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private _userService: UserTrackerService, private _router: Router){}
  canActivate(): boolean {
    if (this._userService.User != null && this._userService != undefined) {
      return true;
    }

    this._router.navigateByUrl('/auth/login');

    return false;
  }
}
