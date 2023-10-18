import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-merit-list',
  templateUrl: './merit-list.component.html',
  styleUrls: ['./merit-list.component.css']
})
export class MeritListComponent {

  // Rest Endpoint
  endpoint = "http://localhost:8000/ORSAPI/Marksheet/meritlist";

  // Contains data
  list:any = []

  constructor(private http:HttpClient) { }

  //Gets merit data 
  
  ngOnInit() {
    var _self = this;
    this.merit(function (res:any,error:any){
      if (error){
        alert("Error: " + error.message);
        return ;
      }
      _self.list = res.data;
    })
  }

  //Calls merit 
  merit(compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in Merit service");
    let url = this.endpoint;
    this.http.get(url).subscribe({
      next:(data) => {
        console.log("Merit Service:Success data---->>1",data)
        compCB(data)
      },
      error:(data) =>{
        console.log("Role Service :Error data---->>2",data)
        compCB(data, true)}
      }); 
  }
}
