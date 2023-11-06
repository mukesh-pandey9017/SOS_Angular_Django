import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { MenuComponent } from './menu/menu.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { CollegeListComponent } from './college-list/college-list.component';
import { RoleComponent } from './role/role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { CollegeComponent } from './college/college.component';
import { CourseComponent } from './course/course.component';
import { MarksheetComponent } from './marksheet/marksheet.component';
import { CourseListComponent } from './course-list/course-list.component';
import { MarksheetListComponent } from './marksheet-list/marksheet-list.component';
import { StudentComponent } from './student/student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { SubjectComponent } from './subject/subject.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { FacultyComponent } from './faculty/faculty.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { TimetableComponent } from './timetable/timetable.component';
import { TimetableListComponent } from './timetable-list/timetable-list.component';
import { MeritListComponent } from './merit-list/merit-list.component';
import { DocumentComponent } from './document/document.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  { path :'',redirectTo:'login',pathMatch:'full'},
  { path : 'login' , component:LoginComponent},
  { path : 'sessionOut' , component:LoginComponent},
  { path : 'welcome' , component:WelcomeComponent},
  { path : 'registration', component:RegistrationComponent},
  { path : 'user', component:UserComponent},
  { path : 'user/:id', component:UserComponent},
  { path : 'userlist', component:UserListComponent},
  { path : 'logout' , component:MenuComponent},
  { path : 'sessionOut' , component:LoginComponent},
  { path : 'changepassword' , component:ChangepasswordComponent},
  { path : 'forgetpassword' , component:ForgetpasswordComponent},
  { path : 'role', component:RoleComponent},
  { path : 'role/:id' , component:RoleComponent},
  { path : 'rolelist' , component:RoleListComponent},
  { path : 'college' , component:CollegeComponent},
  { path : 'college/:id' , component:CollegeComponent},
  { path : 'collegelist' , component:CollegeListComponent},
  { path : 'course' , component:CourseComponent},
  { path : 'course/:id' , component:CourseComponent},
  { path : 'courselist' , component:CourseListComponent},
  { path : 'marksheet' , component:MarksheetComponent},
  { path : 'marksheet/:id' , component:MarksheetComponent},
  { path : 'marksheetlist' , component:MarksheetListComponent},
  { path : 'meritlist' , component:MeritListComponent},
  { path : 'student' , component:StudentComponent},
  { path : 'student/:id' , component:StudentComponent},
  { path : 'studentlist' , component:StudentListComponent},
  { path : 'subject' , component:SubjectComponent},
  { path : 'subject/:id' , component:SubjectComponent},
  { path : 'subjectlist' , component:SubjectListComponent},
  { path : 'faculty' , component:FacultyComponent},
  { path : 'faculty/:id' , component:FacultyComponent},
  { path : 'facultylist' , component:FacultyListComponent},
  { path : 'timetable' , component:TimetableComponent},
  { path : 'timetable/:id' , component:TimetableComponent},
  { path : 'timetablelist' , component:TimetableListComponent},
  { path : 'myprofile',component:MyProfileComponent},
  { path : '**', component:DocumentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
