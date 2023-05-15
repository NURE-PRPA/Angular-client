import {Component, OnInit} from '@angular/core';
import {UserTrackerService} from "../share/user-tracker.service";
import {enableDebugTools} from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{
  public email: string | undefined = "Log in";
  public cred: string | undefined = "Log in";
  constructor(private _userTracker: UserTrackerService) {}

  ngOnInit() {
    this._userTracker.userChange().subscribe(
      user => {
       if (user === undefined || user === null)
         this.cred = 'Log in';
       else
         this.cred = user.firstName + " " + user.lastName;
      }
    )
  }

  protected readonly enableDebugTools = enableDebugTools;
}
