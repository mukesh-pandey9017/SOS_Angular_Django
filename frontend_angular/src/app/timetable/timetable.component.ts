import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeTableService } from '../services/timetable.service';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent {

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  // Timetable form
  form = {
    "id":0,
    "examTime":"",
    "examDate":"",
    "semester":"",
    "subject_ID":"",
    "course_ID":""
  }

  // Input errors
  inputError = {
    "examTime":"",
    "examDate":"",
    "semester":"",
    "subject_ID":"",
    "course_ID":""
  }

  // Server success/fail message
  message = "";

  // Server error
  success: boolean = true;

  constructor(private aroute:ActivatedRoute,private router:Router,private service:TimeTableService) { }

  /**
   * Display record if primary key is used
   */
  ngOnInit() {
    var _self = this;
    this.form.id = Number(this.aroute.snapshot.paramMap.get("id"));
    if ( !isNaN(this.form.id) && this.form.id > 0){
      this.service.get(this.form.id, function (res:any,error:any){
        if (error){
          alert("Timetable Get method Error ngOnInit:----->> " + error.message)
          console.log("Timetable Get method Error ngOnInit:----->> ",error.message)
          return ;
        }
        _self.form = res.data;
      })
    }; this.preload();
  };

  /**
   * Save a record
   */

  save(){
    var _self = this;
    this.ngOnInit();
    if ( isNaN(this.form.id)){
      this.form.id = 0;
    }
    this.service.save(this.form, function (res:any,error:any){
      console.log("Timetable Save--->>", res.data);
      console.log("Timetable form--->>",_self.form);
      if (res.data.error){
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
          "examTime":"",
          "examDate":"",
          "semester":"",
          "subject_ID":"",
          "course_ID":""
      }
    }else{
      _self.message = "Data was not saved";
    }
    });
  }

  preloadSubject:any = [];
  preloadCourse:any = [];

  preload(){
    var _self = this;
    this.service.preload(function (res:any,error:any){
      if (error){
        alert("Preload error: " + error.message);
        return ;
      }
      _self.preloadSubject = res.subpreload;
      _self.preloadCourse = res.coupreload;
    })
  };

  reset(){
    this.form = {
      "id":0,
      "examTime":"",
      "examDate":"",
      "semester":"",
      "subject_ID":"",
      "course_ID":""
    };

    this.inputError = {
      "examTime":"",
      "examDate":"",
      "semester":"",
      "subject_ID":"",
      "course_ID":""
    };
    this.message = "";    
  }

  slot_timings = ["7:00 AM to 10:00 AM","11:00 AM to 2:00 PM","3:00 PM to 6:00 PM"]
  semesters = ['1','2','3','4','5','6','7','8']
    
  
}
