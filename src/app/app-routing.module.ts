import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./body/home/home.component";
import {LoginComponent} from "./body/auth/login/login.component";
import {NotFoundComponent} from "./body/not-found/not-found.component";
import {AboutComponent} from "./body/about/about.component";
import {AccountComponent} from "./body/profile/share/account/account.component";
import {BrowseCoursesComponent} from "./body/browse-courses/browse-courses.component";
import {AuthGuardService} from "./share/guards/auth-guard.service";
import {RegisterComponent} from "./body/auth/register/register.component";
import {CourseInfoComponent} from "./body/course-info/course-header/course-info.component";
import {ViewCertificateComponent} from "./body/view-certificate/view-certificate.component";
import {MyCoursesComponent} from "./body/my-courses/my-courses.component";
import {CreateCourseComponent} from "./body/create/create-course/create-course.component";
import {CreateModulesComponent} from "./body/create/create-modules/create-modules.component";
import {CreateTestsComponent} from "./body/create/create-tests/create-tests.component";
import {CreateTestComponent} from "./body/create/create-test/create-test.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: "full" },
  { path: 'auth', children: [
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent, loadChildren: () => import ('./body/auth/register/register-routing.module').then(rm => rm.RegisterRoutingModule)}
    ]},
  { path: 'about', component: AboutComponent },
  { path: 'profile/account', component: AccountComponent, canActivate: [AuthGuardService] },
  { path: 'certificates/:id', component: ViewCertificateComponent },
  { path: 'my/courses', children: [
      { path: '', component: MyCoursesComponent },
      { path: 'view/:id', component: CourseInfoComponent},
      { path: 'create/course', component: CreateCourseComponent },
      { path: 'create/modules/:id', component: CreateModulesComponent },
      { path: 'create/tests/:id', component: CreateTestsComponent },
      { path: 'create/test/:id', component: CreateTestComponent }
    ]},
  { path: 'browse', children: [
      { path: 'courses', component: BrowseCoursesComponent },
      { path: 'courses/:id', component: CourseInfoComponent}
    ]},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
