import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {

  // Rest endPoint
  endpoint =  "http://localhost:8000/ORSAPI/Changepassword/submit";

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  // ChangePassword form
  form = {
    "login_id" : "",
    "oldPassword" : "",
    "newPassword" : "",
    "confirmPassword" : ""
  }

  // Input Error

  inputError = {
    "oldPassword" : "",
    "newPassword" : "",
    "confirmPassword" : "",
  }

  // Server success/fail message
  message = "";

  // Server Error
  success:boolean = true;

  constructor(private http:HttpClient) { }

  //service code
  changepwd(form:any,compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in changepwd method");
    let url = this.endpoint;
    this.http.post(url,form).subscribe({
      next:(data) => {
        console.log(" Success changepwd submit data---->>1",data)
        compCB(data)
      },
      error:(data) =>{
        console.log("error changepwd submit data---->>2",data)
        compCB(data, true)}
      });
  }

  submit(){
    var _self = this;
    console.log("login id----->>",localStorage.getItem("loginId"));
    _self.form.login_id = localStorage.getItem("loginId")  || "{}";
    this.changepwd(this.form, function(res:any, error:any){
      if(res.form.error){
        _self.success = false;
        _self.message = res.form.message;
        _self.inputError = res.form.inputError;
        _self.isElementVisible = true;
        return;
      };
      _self.success = true;
      _self.message = res.form.message;
      _self.isElementVisible = true;
      _self.inputError = {
        "oldPassword" : "",
        "newPassword" : "",
        "confirmPassword" : ""
      }
    });
  }
  
  reset(){
    this.form = {
      "login_id" : "",
      "oldPassword" : "",
      "newPassword" : "",
      "confirmPassword" : "",
    }

    this.inputError = {
      "oldPassword" : "",
      "newPassword" : "",
      "confirmPassword" : ""
    };

    this.message = "";
    
  };


}
