import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  // server responce message
  message = "";

  // server error
  success: boolean = true;

  // Contains coursse list
  list: any = []

  // search form
  form = {
    "courseName":"",
    "pageNo":1,
    "index":1,
    "MaxId":1,
    "LastId":1,
    "mesg":""
  }

  constructor(private router: Router, private service: CourseService){ }

  // Initilaizing on component load
  ngOnInit() {
    this.search();
  }

  //Updating user record
  edit(id:any){
    this.router.navigateByUrl("/course/" + id);
  }

  //Deleting user record
  delete(id:any){
    var _self = this;
    this.service.delete(id, function (res:any, error:any){
      if (res.data.error){
        alert("course delete method Error:-----" + error.message);
        return;
      }
      _self.success = true;
      _self.message = res.data.message;
      _self.isElementVisible=true;
      _self.form = {
        "courseName":"",
        "pageNo":1,
        "index":1,
        "MaxId":1,
        "LastId":1,
        "mesg":""
      };

      _self.search();

    }); 
  }
  
  
  //Searches and get list
  search(){
    var _self = this;
    console.log("course search method this.form--------",this.form);
    this.service.search(this.form, function(res:any, error:any){
      if (error){
        alert("course Search method Error:-------" + error.message);
        return;
      }
      _self.form.index = res.result.index;
      _self.form.LastId = res.result.LastId;
      _self.form.MaxId = res.result.MaxId;
      _self.form.mesg = res.result.mesg;
      _self.list = res.result.data;
      
      console.log("course Search method data", _self.list);
    })
  }

  //gets record matches the search field
  submit(){
    this.form.pageNo = 1;
    this.search();
    
  }

  // Get Previous records
  previous(){
    this.form.pageNo -= 1;
    this.search();
    this.fadeOutElement()
  }

  // get next records
  next(){
    this.form.pageNo +=1;
    this.search();
    this.fadeOutElement()
  }

  // Reloads the page
  reload(){
    window.location.reload();
  }

}
