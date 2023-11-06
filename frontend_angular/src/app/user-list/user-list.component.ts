import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  // Server Responce Message
  message = "";

  // Server Error
  success: boolean = true;

  // Contains User List
  list: any = [];

  // Search from
  form = {
    "firstName" : "",
    "login_id" : "",
    "pageNo" : 1,
    "index" : 1,
    "MaxId" : 1,
    "LastId" : 1,
    "mesg" : ""
  }

  constructor(private router:Router, private service:UserService){}

  ngOnInit():void{
    console.log("Inside ngOnInit() of user-list component",this.form);
    this.search();
    console.log("This.Search()---->>")
  }

  //Updating user record
  edit(id:number){
    this.router.navigateByUrl("/user/" + id);
  }

  //Deleting user record
  delete(id:number){
    var _self = this;
    this.service.delete(id, function(res:any, error:any){
      if(error){
        _self.success = false;
        _self.isElementVisible=true;
        console.log("User delete method error ------>")
        _self.message = "Can't connect to server ...!!!, Please try after some time";
        alert("Can't connect to server ...!!!, Please try after some time");
        return;
      }else{
        _self.success = true;
        _self.message = res.data.message;
        _self.isElementVisible=true;
        _self.form = {
          "firstName" : "",
          "login_id" : "",
          "pageNo" : 1,
          "index" : 1,
          "MaxId" : 1,
          "LastId" : 1,
          "mesg" : "",
        };

        _self.search();
        
      }
    });
  }

  // search and get list
  search(){
    var _self = this;
    console.log("search in list form---->>",this.form);
    this.service.search(this.form, function(res:any, error:any){
      if (error){
        _self.success = false;
        _self.isElementVisible=true;
        console.log("User search method error ------>"+ error.message)
        _self.message = "Can't connect to server ...!!!, Please try after some time";
        alert("Can't connect to server ...!!!, Please try after some time");
        return;
      }
      _self.form.index = res.result.index;
      _self.form.LastId = res.result.LastId;
      _self.form.MaxId = res.result.MaxId;
      _self.form.mesg = res.result.mesg;
      _self.list = res.result.data;
  
      console.log("User Search method list---->>", _self.list)

    });
  }

  //gets record matches the search field
  submit(){
    console.log("User Search in list form1---->>",this.form);
    this.form.pageNo = 1;
    this.search();
  }

  // Get Previous Records
  previous(){
    this.form.pageNo -= 1;
    this.search();
    this.fadeOutElement()
  }

  // Get Next Records
  next(){
    this.form.pageNo += 1;
    this.search();
    this.fadeOutElement()
  }

  // Reloads the page
  reload(){
    window.location.reload();
  }

}

