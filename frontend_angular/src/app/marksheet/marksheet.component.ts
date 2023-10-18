import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarksheetService } from '../services/marksheet.service';

@Component({
  selector: 'app-marksheet',
  templateUrl: './marksheet.component.html',
  styleUrls: ['./marksheet.component.css']
})
export class MarksheetComponent {

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  // Marksheet form
  form = {
    "id":0,
    "rollNumber":"",
    "name":"",
    "physics":"",
    "chemistry":"",
    "maths":""
  }

  // inputErrors
  inputError = {
    "rollNumber":"",
    "name":"",
    "physics":"",
    "chemistry":"",
    "maths":""
  }

  // Server success/fail message
  message = "";

  // Server error
  success:boolean = true;

  constructor(private aroute:ActivatedRoute,private router:Router,private service:MarksheetService) { }

  /** Display record if primary is used */

  ngOnInit() {
    var _self = this;
    this.form.id = Number(this.aroute.snapshot.paramMap.get("id"));
    if (!isNaN(this.form.id) && this.form.id > 0){
      this.service.get(this.form.id, function (res:any,error:any){
        if (error){
          alert("Maksheet Get method Error ngOnInit:----->> " + error.message)
          console.log("Maksheet Get method Error ngOnInit:----->> ",error.message)
          return;
        }
        _self.form = res.data;
        console.log("Maksheet get method data =", res)
      })
    }
  };

  /** Save a record */

  save(){
    var _self = this;
    this.ngOnInit();
    if (isNaN(this.form.id)){
      this.form.id = 0;
    }
    this.service.save(this.form, function (res:any,error:any){
      if (res.data.error){
        _self.success = false;
        _self.message = res.data.message;
        _self.inputError = res.form.inputError;
        _self.isElementVisible = true;
        return;
      }
      _self.success = true;
      if (_self.success){
        _self.success = true;
        _self.message = res.data.message;
        _self.isElementVisible = true;
        _self.inputError = {
            "rollNumber":"",
            "name":"",
            "physics":"",
            "chemistry":"",
            "maths":""
        }
      }else{
        _self.message = "Data was not saved";
      }
    })
  };

  reset(){
    this.form = {
      "id":0,
      "rollNumber":"",
      "name":"",
      "physics":"",
      "chemistry":"",
      "maths":""
    };
  
    this.inputError = {
      "rollNumber":"",
      "name":"",
      "physics":"",
      "chemistry":"",
      "maths":""
    };
    this.message = "";   
  }
}
