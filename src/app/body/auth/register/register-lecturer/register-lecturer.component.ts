import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Response} from "../../../../core/models/Response";
import {Organization} from "../../../../core/models/organization";
import {OperationResult} from "../../../../core/models/OperationResult";
import {Lecturer} from "../../../../core/models/lecturer";
import {UserTrackerService} from "../../../../share/user-tracker.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register-lecturer',
  templateUrl: './register-lecturer.component.html',
  styleUrls: ['./register-lecturer.component.scss']
})
export class RegisterLecturerComponent implements OnInit {
  public constructor(
    private _http: HttpClient,
    private userTracker: UserTrackerService,
    private _router: Router) {}

  public form!: FormGroup;
  organizations: Organization[] | null = [];

  ngOnInit() {
    this._http.get<Response<Organization[]>>(`http://localhost:5233/api/organizations/all`).subscribe(
      (response) => {
        if (response.status == OperationResult.OK) {
          this.organizations = response.content;
        }
      }
    );

    this.form = new FormGroup<any>({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Z][a-z]{4,10}')
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Z][a-z]{4,10}')
      ]),
      gender: new FormControl("none"),
      experience: new FormControl(null),
      organization: new FormControl(this.organizations![0]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
      ])
    });
  }

  onRegister() {
    let user = <Lecturer>{
      id: '',
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      gender: this.form.get('gender')?.value,
      email: this.form.get('email')?.value,
      organization: this.form.get('organization')?.value,
      password: this.form.get('password')?.value,
      experience: this.form.get('experience')?.value,
    };

    user.organization = this.organizations?.filter(o => {
      return user.organization === o.name;
    })[0] as Organization; // potential errors;

    user.organization.lecturers = [];

    this._http.post<Response<null>>(`http://localhost:5233/api/auth/lecturer/register/standart`, user).subscribe
    ( async (response) => {
      this.userTracker.setUser(user);
      await this._router.navigateByUrl('profile/account');
      console.log(response);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
}

