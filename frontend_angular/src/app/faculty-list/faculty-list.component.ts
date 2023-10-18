import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyService } from '../services/faculty.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent {

  //Variable and Function for fadding out erorr/success messages
  isElementVisible = true;
  fadeOutElement() {
    this.isElementVisible = false;
  }

  // server responce message
  message = "";

  // server error
  success: boolean = true;

  // Contains Faculty list
  list: any = []

  // search form
  form = {
    "firstName":"",
    "pageNo":1,
    "index":1,
    "MaxId":1,
    "LastId":1,
    "mesg":""
  }

  constructor(private router: Router, private service: FacultyService){ }

  // Initilaizing on component load
  ngOnInit() {
    this.search();
  }

  //Updating user record
  edit(id:any){
    this.router.navigateByUrl("/faculty/" + id);
  }

  //Deleting user record
  delete(id:any){
    var _self = this;
    this.service.delete(id, function (res:any, error:any){
      if (res.data.error){
        alert("Faculty delete method Error:-----" + error.message);
        return;
      }
      _self.success = true;
      _self.message = res.data.message;
      _self.isElementVisible=true;
      _self.form = {
        "firstName":"",
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
    console.log("Faculty search method this.form--------",this.form);
    this.service.search(this.form, function(res:any, error:any){
      if (error){
        alert("Faculty Search method Error:-------" + error.message);
        return;
      }
      _self.form.index = res.result.index;
      _self.form.LastId = res.result.LastId;
      _self.form.MaxId = res.result.MaxId;
      _self.form.mesg = res.result.mesg;
      _self.list = res.result.data;
      
      console.log("Faculty Search method data", _self.list);
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
