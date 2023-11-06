import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }
  

  //Registration Form

  form = {
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
    "role_Id" : 2,
    "role_Name" : "",
  }

  //Input Errors
  inputError = {
    "firstName" : "",
    "lastName" : "",
    "login_id" : "",
    "password" : "",
    "confirmpassword" : "",
    "dob" : "",
    "address" : "",
    "gender" : "",
    "mobilenumber" : "" 
  }

   //Server Success / fail message
   message = "";

   // Server Error
   success : boolean = true;

   constructor(private router:Router, private service:RegistrationService ){}

   ngOnInit(): void {
    //localStorage.clear()
    localStorage.setItem("sess_msg","");
    localStorage.setItem("logout_msg","");
    
  }

  // save a record
  save(){

    if (isNaN(this.form.id)){
      this.form.id=0;
    }

    var _self = this;
    this.service.save(this.form,function(res:any, error:any){
      console.log("service.save-res---->>",res)
      if(error){
        _self.success = false;
        _self.isElementVisible=true;
        console.log("Registration save method error ------>")
        _self.message = "Can't connect to server ...!!!, Please try after some time";
        alert("Server connection error");
        return;
      }
      if (res.data.error){
        console.log("res.data.error----->>",res.data.error)
        _self.success = false;
        _self.message = res.data.message;
        _self.inputError = res.form.inputError;
        _self.isElementVisible = true;
        
        return;
      }
      _self.success = res.data.message;
      if(_self.success){
        console.log("_self.success---->>",_self.success)
        _self.success = true;
        _self.message = res.data.message;
        _self.isElementVisible = true;
        
        _self.inputError = {
          "firstName" : "",
          "lastName" : "",
          "login_id" : "",
          "password" : "",
          "confirmpassword" : "",
          "dob" : "",
          "address" : "",
          "gender" : "",
          "mobilenumber" : ""
        };
      }
      else{
        _self.success = false;
        _self.message = "Data was not saved";
      }

    });
    
    this.fadeOutElement()
    
  }

  reset(){
    this.form = {
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
      "role_Id" : 2,
      "role_Name" : "",
    }
    this.inputError = {
      "firstName" : "",
      "lastName" : "",
      "login_id" : "",
      "password" : "",
      "confirmpassword" : "",
      "dob" : "",
      "address" : "",
      "gender" : "",
      "mobilenumber" : "",
    }

    this.message = "";
  };

}
