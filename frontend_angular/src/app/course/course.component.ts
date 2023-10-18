import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  // Course form
  form = {
    "id" : 0,
    "courseName" : "",
    "courseDescription" : "",
    "courseDuration" : "", 
  }

  // Input errors
  inputError = {
    "courseName" : "",
    "courseDescription" : "",
    "courseDuration" : "", 
  }

  // Server success/fail message
  message = "";

  // Server error
  success: boolean = true;

  // Activated route is used to read route parameters
  constructor(private aroute:ActivatedRoute,private router:Router,private service:CourseService) {}

  // Displays record if primary key is received

  ngOnInit(): void {
    var _self = this;
    _self.form.id = parseInt(this.aroute.snapshot.paramMap.get("id") || "{}");
    if ( !isNaN(_self.form.id) && _self.form.id > 0){
      this.service.get(_self.form.id, function (res:any, error:any){
        if (error){
          alert("Course Get method Error ngOnInit:----->> " + error.message)
          console.log("Course Get method Error ngOnInit:----->> ",error.message)
          return ;
        }
        console.log("Course get method data =", res)
        _self.form = res.data;
      });
    }
  }

  //save a record

  save(){
    var _self = this;
    this.ngOnInit();

    if (isNaN(this.form.id)){
      this.form.id = 0;
    }
    
    this.service.save(this.form, function(res:any, erorr:any){
      console.log("Course Save--->>", res.data);
      console.log("Course form--->>",_self.form)
      // _self.reset()
      if(res.data.error){
        _self.success = false;
        _self.message = res.data.message;
        _self.inputError = res.form.inputError;
        _self.isElementVisible = true;
        return;
      }
      _self.success = res.data.message;
      console.log("res.data.message--->>", _self.success);
      if(_self.success){
        _self.success = true;
        _self.message = res.data.message;
        _self.isElementVisible = true;
        _self.inputError = {
          "courseName" : "",
          "courseDescription" : "",
          "courseDuration" : "", 
        }

      }
      else{
        _self.message = "Data was not Saved";
      }
    });

    this.fadeOutElement()
  }

  reset(){
    this.form = {   
      "id":0,
      "courseName":"",
      "courseDescription":"",
      "courseDuration":""
    }
    this.inputError = {
      "courseName":"",
      "courseDescription":"",
      "courseDuration":""
    }
    this.message = "";
  };


}
