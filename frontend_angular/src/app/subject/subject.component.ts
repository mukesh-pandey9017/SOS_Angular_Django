import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  // Subject form

  form = {
    "id":0,
    "subjectName":"",
    "subjectDescription":"",
    "course_ID":""
  }

  // Input Errors

  inputError = {
    "subjectName":"",
    "subjectDescription":"",
    "course_ID":""
  }

  // Server success/fail message
  message = "";

  // Server error
  success:boolean  = true;

  constructor(private aroute:ActivatedRoute,private router:Router,private service:SubjectService) { }

  /** Display record if primary key is used */

  ngOnInit() {
    var _self = this;
    this.form.id = parseInt(this.aroute.snapshot.paramMap.get("id") || "{}");
    if ( !isNaN(this.form.id) && this.form.id > 0){
      this.service.get(this.form.id, function (res:any,error:any){
        if (error){
          alert("Subject Get method Error ngOnInit:----->> " + error.message)
          console.log("Subject Get method Error ngOnInit:----->> ",error.message)
          return ;
        }
        _self.form = res.data;
      })
    }; this.preload();
  }

  /**
   * Save a record
   */

  save(){
    var _self = this;
    this.ngOnInit();
    if (isNaN(this.form.id)){
      this.form.id = 0;
    }
    this.service.save(this.form, function (res:any,error:any){
      console.log("Subject Save--->>", res.data);
      console.log("Subject form--->>",_self.form);
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
          "subjectName":"",
          "subjectDescription":"",
          "course_ID":""
        }
      } else {
        _self.message = "Data was not saved";
      }
    })
  };

  preloadData:any = []

  preload(){
    var _self = this;
    this.service.preload(function (res:any,error:any){
      if (error){
        alert("Error: " + error.message);
        return;
      }
      _self.preloadData = res.preloadList;
    })
  };

  reset(){
    this.form = {
      "id":0,
      "subjectName":"",
      "subjectDescription":"",
      "course_ID":""
    };
    this.inputError = {
      "subjectName":"",
      "subjectDescription":"",
      "course_ID":""
    }
    this.message = "";
  };
}

