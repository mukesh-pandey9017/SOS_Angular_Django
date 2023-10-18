import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  // Rest endpoint
  endpoint = "http://localhost:8000/ORSAPI/ForgetPassword/submit";

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  // Forgetpassword form

  form = {
    "login_id" : ""
  }

  //Input Error

  inputError = {
    "login_id" : ""
  }

  //server success or fail message
  message = "";

  // server error
  success:boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    localStorage.setItem("sess_msg", "");
    localStorage.setItem("logout_msg", "");
  }

  //service code
  forgetpwd(form:any,compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in forgetpwd method");
    let url = this.endpoint;
    this.http.post(url,form).subscribe({
      next:(data) => {
        console.log(" Success forgetpwd submit data---->>1",data)
        compCB(data)
      },
      error:(data) =>{
        console.log("error forgetpwd submit data---->>2",data)
        compCB(data, true)}
      });
  }

  submit(){
    var _self = this;
    this.forgetpwd(this.form, function (res:any, error:any){
      console.log("submit forgetpwd res--->>", res)
      if (res.data.error){
        _self.success = false;
        _self.message = res.data.message;
        _self.inputError = res.form.inputError;
        _self.isElementVisible = true;
        return;
      }
      _self.success = true;
      _self.message = res.data.message;
      _self.isElementVisible = true;
      _self.inputError = { "login_id" : "" }
    });
  }

}
