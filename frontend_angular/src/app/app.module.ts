import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import {  HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { CollegeComponent } from './college/college.component';
import { CollegeListComponent } from './college-list/college-list.component';
import { CourseListComponent } from './course-list/course-list.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { TimetableListComponent } from './timetable-list/timetable-list.component';
import { RoleListComponent } from './role-list/role-list.component';
import { MarksheetListComponent } from './marksheet-list/marksheet-list.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { CourseComponent } from './course/course.component';
import { FacultyComponent } from './faculty/faculty.component';
import { MarksheetComponent } from './marksheet/marksheet.component';
import { RoleComponent } from './role/role.component';
import { StudentComponent } from './student/student.component';
import { SubjectComponent } from './subject/subject.component';
import { TimetableComponent } from './timetable/timetable.component';
import { MeritListComponent } from './merit-list/merit-list.component';
import { DocumentComponent } from './document/document.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    MenuComponent,
    RegistrationComponent,
    UserComponent,
    UserListComponent,
    ChangepasswordComponent,
    ForgetpasswordComponent,
    CollegeComponent,
    CollegeListComponent,
    CourseListComponent,
    SubjectListComponent,
    StudentListComponent,
    TimetableListComponent,
    RoleListComponent,
    MarksheetListComponent,
    FacultyListComponent,
    CourseComponent,
    FacultyComponent,
    MarksheetComponent,
    RoleComponent,
    StudentComponent,
    SubjectComponent,
    TimetableComponent,
    MeritListComponent,
    DocumentComponent,
    MyProfileComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
