import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollegeService } from '../services/college.service';



@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent {

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  // College form
  form = {
    "id":0,
    "collegeName":"",
    "collegeAddress":"",
    "collegeState":"",
    "collegeCity":"",
    "collegePhoneNumber":"",
  }

  // Input errors
  inputError = {
    "collegeName":"",
    "collegeAddress":"",
    "collegeState":"",
    "collegeCity":"",
    "collegePhoneNumber":""
  }

  // Server success/fail message
  message = "";

  // Server error
  success: boolean = true;

  // Activated route is used to read route parameters
  constructor(private aroute:ActivatedRoute,private router:Router,private service:CollegeService) {}

  // Displays record if primary key is received

  ngOnInit(): void {
    var _self = this;
    _self.form.id = parseInt(this.aroute.snapshot.paramMap.get("id") || "{}");
    if ( !isNaN(_self.form.id) && _self.form.id > 0){
      this.service.get(_self.form.id, function (res:any, error:any){
        if (error){
          alert("College Get method Error ngOnInit:----->> " + error.message)
          console.log("College Get method Error ngOnInit:----->> ",error.message)
          return ;
        }
        console.log("College get method data =", res)
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
      console.log("College Save--->>", res.data);
      console.log("College form--->>",_self.form);
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
    "collegeName":"",
    "collegeAddress":"",
    "collegeState":"",
    "collegeCity":"",
    "collegePhoneNumber":""
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
      "collegeName":"",
      "collegeAddress":"",
      "collegeState":"",
      "collegeCity":"",
      "collegePhoneNumber":""
    };
    
    this.inputError = {
      "collegeName":"",
      "collegeAddress":"",
      "collegeState":"",
      "collegeCity":"",
      "collegePhoneNumber":""
    };
    this.message = "";
  }


}
