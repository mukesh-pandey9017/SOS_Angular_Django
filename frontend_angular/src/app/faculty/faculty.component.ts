import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyService } from '../services/faculty.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent {

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  // Faculty form
  form = {
    "id":0,
    "firstName":"",
    "lastName":"",
    "email":"",
    "password":"",
    "address":"",
    "gender":"",
    "dob":"",
    "college_ID":"",
    "subject_ID":"",
    "course_ID":""
  }

  // Input Errors
  inputError = {
    "firstName":"",
    "lastName":"",
    "email":"",
    "password":"",
    "address":"",
    "gender":"",
    "dob":"",
    "college_ID":"",
    "subject_ID":"",
    "course_ID":""
  }

  // Server success/fail message
  message = "";

  // Server error
  success:boolean = true;

  constructor(private aroute:ActivatedRoute, private route: Router, private service: FacultyService) { }

  ngOnInit() {
    var _self = this;
    this.form.id = parseInt(this.aroute.snapshot.paramMap.get("id") || "{}");
    if( !isNaN(this.form.id) && this.form.id > 0){
      this.service.get(this.form.id, function(res:any, error:any){
        if (error){
          alert("Faculty Get method Error ngOnInit:----->> " + error.message)
          console.log("Faculty Get method Error ngOnInit:----->> ",error.message)
          return;
        }
        _self.form = res.data;
        console.log("Faculty get method data =", res)
      })
    }
    this.preload();

  }

  preloadSubject:any = []
  preloadCourse:any = []
  preloadCollege:any = []

  preload(){
    var _self = this;
    this.service.preload(function(res:any, error:any){
        if (error){
          alert("Preload Error: " + error.message);
          return ;
        }
        _self.preloadSubject = res.subpreload;
        _self.preloadCourse = res.coupreload;
        _self.preloadCollege = res.colpreload;
    })

  };

  reset(){
    this.form = {
      "id":0,
      "firstName":"",
      "lastName":"",
      "email":"",
      "password":"",
      "address":"",
      "gender":"",
      "dob":"",
      "college_ID":"",
      "subject_ID":"",
      "course_ID":""
    }
    
    this.inputError = {
      "firstName":"",
      "lastName":"",
      "email":"",
      "password":"",
      "address":"",
      "gender":"",
      "dob":"",
      "college_ID":"",
      "subject_ID":"",
      "course_ID":""
    }
    this.message = "";
    };

    save(){
      var _self = this;
      this.ngOnInit();
      if(isNaN(this.form.id)){
        this.form.id = 0
      }
      this.service.save(this.form, function(res:any, error:any){
        if(res.data.error){
          _self.success = false;
          _self.message = res.data.message;
          _self.inputError = res.form.inputError;
          _self.isElementVisible = true;
          return;
        }

        _self.success = res.data.message;
        
        if (_self.success){
          _self.success = true;
          _self.message = res.data.message;
          _self.isElementVisible = true;
          _self.inputError = {
            "firstName":"",
            "lastName":"",
            "email":"",
            "password":"",
            "address":"",
            "gender":"",
            "dob":"",
            "college_ID":"",
            "subject_ID":"",
            "course_ID":""
          }
          }else{

          _self.message = "Data was not saved";

        }
      });
    }
}
