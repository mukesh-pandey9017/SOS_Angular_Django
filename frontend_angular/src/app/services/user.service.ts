import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Rest Endpoint
  endpoint = "http://localhost:8000/ORSAPI/User/";

  constructor(private http:HttpClient) { }

  get(id:Number,compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in user service get method");
    let url = this.endpoint + "get/" + id;
    this.http.get(url).subscribe(
      function success(data){
        console.log("Service:success user get/id method data---->>1",data)
        compCB(data)
      },
      function fail(data){
        console.log("Service:erorr user get/id method data---->>2",data)
        compCB(data, true)}
      );
  }

  preload(compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in user service preload method");
    let url = this.endpoint + "preload/";
    this.http.get(url).subscribe(
      function success(data){
        console.log("Service:success user preload method data---->>1",data)
        compCB(data)
      },
      function fail(data){
        console.log("Service:error user preload method data---->>2",data)
        compCB(data, true)}
      );

  }

  delete(id:Number,compCB:any){

    console.log("compCB---->>",compCB);
    console.log("in user service delete method");
    let url = this.endpoint + "delete/" + id;
    this.http.get(url).subscribe(
      function success(data){
        console.log("User Service delete/id method:Success data---->>1",data)
        compCB(data)
      },
      function fail(data){
        console.log("User Service delete/id method:Erorr data---->>2",data)
        compCB(data, true)}
      );
  }

  search(form:any, compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in user service search method");
    let url = this.endpoint + 'search/';
    this.http.post(url,form).subscribe(
      function success(data){
        console.log("User Service search method:Success data---->>1",data)
        compCB(data)
      },
      function fail(data){
        console.log("User Service search method:Error data---->>2",data)
        compCB(data, true)}
      );
  }

  save(form:any,compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in user service save method");
    let url = this.endpoint + 'save/';
    this.http.post(url,form).subscribe(
      function success(data){
        console.log("User Service save method:Success data---->>1",data)
        compCB(data)
      },
      function fail(data){
        console.log("User Service save method:Error data---->>2",data)
        compCB(data, true)}
      ); 
  }
}
