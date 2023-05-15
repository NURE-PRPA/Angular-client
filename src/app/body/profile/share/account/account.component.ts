import {Component, OnInit} from '@angular/core';
import {UserTrackerService} from "../../../../share/user-tracker.service";
import {Listener} from "../../../../core/models/listener";
import {User} from "../../../../core/models/user";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{
  user: User | Listener | null | undefined = undefined;
  userType = 'listener';
  constructor(private _userTracker: UserTrackerService) {}

  ngOnInit(): void {
    this.user = this._userTracker.User;
  }
}
