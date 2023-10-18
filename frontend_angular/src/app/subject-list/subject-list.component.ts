import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent {

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  // Server Responce Message
  message = "";

  // Server Error
  success: boolean = true;

  // Contains Subject List
  list: any = [];

  // Search from
  form = {
    "subjectName" : "",
    "pageNo" : 1,
    "index" : 1,
    "MaxId" : 1,
    "LastId" : 1,
    "mesg" : ""
  }

  constructor(private router:Router, private service:SubjectService){}

  ngOnInit():void{
    console.log("Search in list form2---->>",this.form);
    this.search();
    console.log("This.Search()---->>")
  }

  //Updating Subject record
  edit(id:number){
    this.router.navigateByUrl("/subject/" + id);
  }

  //Deleting Subject record
  delete(id:number){
    var _self = this;
    this.service.delete(id, function(res:any, error:any){
      if(res.data.error){
        alert("Subject delete method Error: " + error.message);
        return;
      }else{
        _self.success = true;
        _self.message = res.data.message;
        _self.isElementVisible=true;
        
      }
    });

    this.form = {
      "subjectName" : "",
      "pageNo" : 1,
      "index" : 1,
      "MaxId" : 1,
      "LastId" : 1,
      "mesg" : "",
    }

    this.search();

  }

  // search and get list
  search(){
    var _self = this;
    console.log("search in list form---->>",this.form);
    this.service.search(this.form, function(res:any, error:any){
      if (error){
        alert("Subject search method Error :----->> " + error.message);
        return;
      }
      _self.form.index = res.result.index;
      _self.form.LastId = res.result.LastId;
      _self.form.MaxId = res.result.MaxId;
      _self.form.mesg = res.result.mesg;
      _self.list = res.result.data;
  
      console.log("Subject Search method list---->>", _self.list)
    });
  }

  //gets record matches the search field
  submit(){
    console.log("Subject Search in list form1---->>",this.form);
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

