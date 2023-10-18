import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  // Rest endpoint
  endpoint = "http://localhost:8000/ORSAPI/MyProfile/get";

  //My profile form
  form:any = {
    "id" : 0,
    "firstName" : "",
    "lastName" : "",
    "login_id" : "",
    "password" : "",
    "confirmpassword" : "",
    "dob" : "",
    "address" : "",
    "gender" : "",
    "mobilenumber" : "",
    "role_Id" : "",
    "role_Name" : "",
  }

  success:boolean = true;
  message = ""

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var _self = this;
    console.log("login id----->>",localStorage.getItem("loginId"));
    _self.form.login_id = localStorage.getItem("loginId")  || "";
    _self.form.firstName = localStorage.getItem("firstName")  || "";
    _self.form.roleName = localStorage.getItem("roleName")  || "";
    this.myProfile(this.form,function(res:any,error:any){
      if(error){
      alert("MyPofile get method Error ngOnInit:----->> " + error.message)
      console.log("MyPofile Get method Error ngOnInit:----->> ",error.message)
      return;}
      
      console.log("User get method data =", res)
      _self.form = res.data
      
    })
  }

  //service code
  myProfile(form:any,compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in forgetpwd method");
    let url = this.endpoint;
    this.http.post(url,form).subscribe({
      next:(data) => {
        console.log(" Success myProfile get data---->>1",data)
        compCB(data)
      },
      error:(data) =>{
        console.log("error myProfile get data---->>2",data)
        compCB(data, true)}
      });
  }
}
