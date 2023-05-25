import {Component, OnInit} from '@angular/core';
import {UserTrackerService} from "../../../../share/user-tracker.service";
import {Listener} from "../../../../core/models/listener";
import {User} from "../../../../core/models/user";
import {Lecturer} from "../../../../core/models/lecturer";
import {Response} from "../../../../core/models/Response";
import {Certificate} from "../../../../core/models/certificate";
import {OperationResult} from "../../../../core/models/OperationResult";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{
  user: User | Listener | Lecturer | null | undefined = undefined;
  certificates: Certificate[] | null = [];
  constructor(private _userTracker: UserTrackerService, private currentRoute: ActivatedRoute, private _http: HttpClient, private _router: Router) {}

  ngOnInit(): void {
    this.user = this._userTracker.User;

    this._http.get<Response<Certificate[]>>(`https://quantedapi.azurewebsites.net/api/certificates/my`, {withCredentials: true}).subscribe(
      (response) => {
        if (response.status == OperationResult.OK) {
          this.certificates = response.content;
        }
      }
    );
  }

  logOut(){
    this._http.post<Response<object | null>>('https://quantedapi.azurewebsites.net/api/auth/logout', {}, {withCredentials: true})
      .subscribe( (response) => {
        this._router.navigateByUrl('/auth/login');
    }, (error: HttpErrorResponse) => {
      console.log(error);
    })
  }

    protected readonly undefined = undefined;
}
