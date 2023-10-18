import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  //role form
  form = {
    "id" : 0,
    "name" : "",
    "description" : ""
  }
   // input errors
  inputError ={
    "name" : "",
    "description" : ""
  }

  //server success/fail message
  message = "";

  //server error
  success:boolean = true;

  constructor(private aroute:ActivatedRoute,private router:Router,private service:RoleService  ) { }

   /**
   * Display record if primary key is used
   */

  ngOnInit(): void {
    var _self = this;
    this.form.id = Number(this.aroute.snapshot.paramMap.get("id"));
    if(!isNaN(this.form.id) && (this.form.id > 0)){
      this.service.get(this.form.id,function(res:any,error:any){
        if (error){
          alert("Role Get method Error ngOnInit:----->> " + error.message)
          console.log("Role Get method Error ngOnInit:----->> ",error.message)
          return;

        }
        _self.form = res.data;
        console.log("College get method data =", res)
      });
    }
   }

     /** Save a record */

  save(){
    var _self = this;
    this.ngOnInit();
    if ( isNaN(this.form.id)){
      this.form.id = 0;
    };
    this.service.save(this.form, function (res:any,error:any){
      console.log("Role Save--->>", res.data);
      console.log("Role form--->>",_self.form)

      if (res.data.error){
        _self.success = false;
        _self.message = res.data.message;
        _self.inputError = res.form.inputError;
        _self.isElementVisible = true;
        return ;
      }
      _self.success = res.data.message;
      if (_self.success){
        _self.success = true;
        _self.message = res.data.message;
        _self.isElementVisible = true;
        _self.inputError = {
          "name":"",
          "description":""
        }
      }else{
        _self.message = "Data was not saved";
      }
    });
  }

  reset(){
    this.form = {
      "id":0,
      "name":"",
      "description":""
    }
    
    this.inputError = {
      "name":"",
      "description":""
    }
    this.message = "";
  }
}