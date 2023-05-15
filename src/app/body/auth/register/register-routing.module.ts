import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterChooseComponent} from "./register-choose/register-choose.component";
import {RegisterListenerComponent} from "./register-listener/register-listener.component";
import {RegisterLecturerComponent} from "./register-lecturer/register-lecturer.component";

const routes: Routes = [
  { path: '', component: RegisterChooseComponent },
  { path: 'listener', component: RegisterListenerComponent },
  { path: 'lecturer', component: RegisterLecturerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class RegisterRoutingModule { }
