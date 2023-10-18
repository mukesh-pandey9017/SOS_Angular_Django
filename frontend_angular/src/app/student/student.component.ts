import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  // student form
  form = {
    "id" : 0,
    "firstName" : "",
    "lastName" : "",
    "email" : "",
    "dob" : "",
    "mobileNumber" : "",
    "college_ID" : "",
  }

  // inputerror
  inputError = {
    "firstName" : "",
    "lastName" : "",
    "email" : "",
    "dob" : "",
    "mobileNumber" : "",
    "college_ID" : "",
  }

  message = "";

  success:boolean = true;
  
  preloadData: any = [];

  constructor(private aroute: ActivatedRoute,private route: Router, private service: StudentService) { }

  ngOnInit() {
    
    var _self = this
    this.form.id = parseInt(this.aroute.snapshot.paramMap.get("id") || "{}")
    if (!isNaN(this.form.id) && (this.form.id) > 0){
      this.service.get(this.form.id, function(res:any,error:any){
        if (error){
          alert("Student Get method Error ngOnInit:----->> " + error.message)
          console.log("Student Get method Error ngOnInit:----->> ",error.message)
          return;
        }
        console.log("Student get method data =", res)
        _self.form = res.data;
        
      });
    }
    this.preload();
  };

  
  preload(){
    var _self = this;
    this.service.preload(function(res:any, error:any){
      if(error){
        alert("Preload Error:----->>" + error.message);
        return;
      }
      _self.preloadData = res.preloadList;
      console.log("PreloadList---->>", res.preloadList);
    });
  }

  reset(){
    this.form = {
      "id":0,
      "firstName":"",
      "lastName":"",
      "email":"",
      "dob":"",
      "mobileNumber":"",
      "college_ID":""
    };

    this.inputError = {
      "firstName":"",
      "lastName":"",
      "email":"",
      "dob":"",
      "mobileNumber":"",
      "college_ID":""
    };
    this.message ="";
  }

  save(){
    var _self = this;
    this.ngOnInit();
    if (isNaN(this.form.id)){
      this.form.id = 0;
    }
    this.service.save(this.form, function(res:any,error:any){
      console.log("Student Save--->>", res.data);
      console.log("Student form--->>",_self.form);
      if (res.data.error){
        _self.success = false;
        _self.message = res.data.message;
        _self.inputError = res.form.inputError;
        _self.isElementVisible = true;
        return;
      }
      _self.success = res.data.message;
      if(_self.success){
        _self.success = true;
        _self.message = res.data.message;
        _self.isElementVisible = true;
        _self.inputError = {
            "firstName":"",
            "lastName":"",
            "email":"",
            "dob":"",
            "mobileNumber":"",
            "college_ID":""
        }
      }else{
        _self.message = "Data not saved";
      }
    });
  };
}

