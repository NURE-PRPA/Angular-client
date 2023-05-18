import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {UserTrackerService} from "../../../share/user-tracker.service";
import {Response} from "../../../core/models/Response";
import {User} from "../../../core/models/user";
import {Listener} from "../../../core/models/listener";
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['style-login.scss'],
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';

  constructor(private _router: Router, private _http: HttpClient, private _userTracker: UserTrackerService) {
  }

  loginForm: FormGroup =  new FormGroup({
    email: new FormControl(null, Validators.email),
    password: new FormControl(null, [
      Validators.required,
      Validators.min(8)
    ])
  });
  async onLoginClick() {
    this._http.post<Response<object | null>>('http://localhost:5233/api/auth/login', {
      email: this.email,
      password: this.password,
      userType: ''
    }, {
      withCredentials: true
    }).subscribe(async (response) => {
    }, (error: HttpErrorResponse) => {
      console.log(error);
    },
      () => {
      this._http.get<Response<User | Listener>>('http://localhost:5233/api/profile/me/info', {
        withCredentials: true
      }).subscribe(
        (response) => {
          this._userTracker.setUser(response.content);
        },
        undefined,
        () => {
          this._router.navigateByUrl('/profile/account');
        }
      )
      });
  }
  ngOnInit(): void {
  }
}
