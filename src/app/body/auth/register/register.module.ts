import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import {RouterModule} from "@angular/router";
import {RegisterLecturerComponent} from "./register-lecturer/register-lecturer.component";
import {RegisterChooseComponent} from "./register-choose/register-choose.component";
import {RegisterComponent} from "./register.component";
import {RegisterListenerComponent} from "./register-listener/register-listener.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RegisterLecturerComponent,
    RegisterChooseComponent,
    RegisterComponent,
    RegisterListenerComponent,
  ],
  imports: [
      CommonModule,
      RouterModule,
      RegisterRoutingModule,
      ReactiveFormsModule
  ],
  exports: []
})
export class RegisterModule { }
