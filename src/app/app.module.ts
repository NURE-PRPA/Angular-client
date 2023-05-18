import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './body/home/home.component';
import { LoginComponent } from './body/auth/login/login.component';
import { AboutComponent } from './body/about/about.component';
import { NotFoundComponent } from './body/not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AccountComponent } from './body/profile/share/account/account.component';
import { HttpClientModule } from "@angular/common/http";
import {UserTrackerService} from "./share/user-tracker.service";
import { BrowseCoursesComponent } from './body/browse-courses/browse-courses.component';
import {AuthGuardService} from "./share/guards/auth-guard.service";
import {RegisterModule} from "./body/auth/register/register.module";
import { CourseInfoComponent } from './body/course-info/course-header/course-info.component';
import {CourseStorage} from "./core/storage";
import {ModuleListerComponent} from "./body/course-info/module-lister/module-lister.component";
import { ViewCertificateComponent } from './body/view-certificate/view-certificate.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    NotFoundComponent,
    AccountComponent,
    BrowseCoursesComponent,
    ModuleListerComponent,
    CourseInfoComponent,
    ViewCertificateComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    RegisterModule,
  ],
  providers: [UserTrackerService, AuthGuardService, CourseStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
