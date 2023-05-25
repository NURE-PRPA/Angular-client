import {Component, OnInit} from '@angular/core';
import {Response} from "../../core/models/Response";
import {Course} from "../../core/models/course";
import {OperationResult} from "../../core/models/OperationResult";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Certificate} from "../../core/models/certificate";

@Component({
  selector: 'app-view-certificate',
  templateUrl: './view-certificate.component.html',
  styleUrls: ['./view-certificate.component.scss']
})
export class ViewCertificateComponent implements OnInit {
  certificateId: string | null = '';
  certificate: Certificate | null = null;
  date: string | null = null;
  constructor(private currentRoute: ActivatedRoute, private _http: HttpClient) {}
  ngOnInit() {
    this.certificateId = this.currentRoute.snapshot.paramMap.get('id');
    this._http.get<Response<Certificate>>(`https://quantedapi.azurewebsites.net/api/certificates/${this.certificateId}`, {withCredentials: true}).subscribe(
      (response) => {
        if (response.status == OperationResult.OK) {
          this.certificate = response.content;
          var date = new Date(this.certificate?.date!);
          this.date = date.toLocaleDateString('en-GB');
        }
      }
    );
  }
}
