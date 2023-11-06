import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit{

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  
  fadeOutElement() {
    
    this.isElementVisible = false;
    console.log("calling fadeout function")
  }
  
  success=true

  sess_msg:any;
  
  form:any={
    "login_id":'',
    "password":'',
    "message":'',
    "error":'',
  }

  inputError = {
    "login_id":'',
    "password":'',
  }

  constructor(private router: Router, private service: AuthService){
    console.log("in login component constructor")
  }
  
  ngOnInit(): void {

    console.log('"inside ngOnInit() of menu component ---->>>>>>>>>>>>>>"')
    localStorage.removeItem("loginId")
    console.log("this.router.url---->>",this.router.url)
    if(this.router.url == '/sessionOut'){
      this.success = false
      this.form.message = localStorage.getItem('sess_msg')
      console.log("ngOnInit-sess_msg-->",localStorage.getItem("sess_msg"))
    }
    else{
      console.log("else login ng on init called--->>")
      let msg = localStorage.getItem("logout_msg")
      console.log("logout msg---->>",msg)
      if (msg != null && msg != "null"){
        this.success = true;
        this.form.message = msg;
        console.log("ngOnInit--->>logout_msg--->>",localStorage.getItem("logout_msg"));
      }
    }

  }

  signIn(){
    var _self = this
    console.log("signIn-->");
    
    this.service.auth(this.form, function(info:any,error:any){
      console.log("info---->>",info)
      if (error){
        _self.success = false;
        console.log("Login")
        _self.form.message = "Can't connect to server....!!!, please try after some time";
        alert("Sever Connection Error")
        _self.isElementVisible = true;
      }
      else if (info.form.error){
        _self.success = false;
        _self.form.message = info.form.message;
        _self.inputError = info.form.inputError;
        _self.isElementVisible = true;
      }
      else{
        localStorage.clear();
        console.log("signIn--->",info.form.error);
        localStorage.setItem("loginId",info.form.data.login_id);
        localStorage.setItem("roleName",info.form.data.role_Name);
        localStorage.setItem("firstName",info.form.data.firstName);
        _self.router.navigateByUrl("/welcome");
      }
    })
    this.fadeOutElement();
  }

  onclick(){
    this.router.navigateByUrl("/registration");
  }

}

