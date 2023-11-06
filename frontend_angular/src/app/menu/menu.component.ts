import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  msg = '';
  firstName:any = '';
  roleName:any = '';

  constructor(private router:Router, private location:Location ){
    console.log("in menu component const");
  }

  ngOnInit(): void {
    console.log("inside ngOnInit of menu component ---->");
    this.isSessionOut();
    this.isLogout();
  }

  isSessionOut(){
    let loginId = localStorage.getItem('loginId');
    console.log("isSessionout method-->login-->", loginId)
    console.log("this.location.path()", this.location.path())
    console.log("this.router.url", this.router.url)

    if ((loginId == "null" || loginId == null) &&
        (this.location.path() != "" &&
        this.location.path() != "/login" &&
        this.location.path() != "/sessionOut" &&
        this.location.path() != "/logout" &&
        this.location.path() != "/registration" &&
        this.location.path() != "/forgetpassword")){
      localStorage.clear();
      console.log("Session Out Path--->", this.location.path());
      this.msg = "Oops!!! Your session is expired";
      localStorage.setItem("sess_msg",this.msg );
      this.router.navigateByUrl("/sessionOut");
      return true;
        }else {
          return false;
        }
  }


  isLogin(){
    console.log("menu--> islogin-->")
    let check = localStorage.getItem('loginId')
    if (check != "null" && check != null){
      this.roleName = localStorage.getItem("roleName");
      this.firstName = localStorage.getItem("firstName");
      return true;
    } else {
      return false;
    }
  }

  isLogout(){
    console.log("menu-->isLogOut-->")
    if(this.location.path() == "/logout"){
    localStorage.clear()
    localStorage.setItem("loginId", "null");
    localStorage.setItem("logout_msg", "Logout Successfully!!");
    console.log("isLogout if condition called ---->>")
    this.router.navigateByUrl("/login")
    }
    
  }

}


