import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // Reset Endpoint
  endpoint = "http://localhost:8000/ORSAPI/Course/"

  constructor(private http:HttpClient) { }

  get(id:Number,compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in Course service get method");
    let url = this.endpoint + "get/" + id;
    this.http.get(url).subscribe({
      next:(data) => {
        console.log("Service:success Course get/id method data---->>1",data)
        compCB(data)
      },
      error:(data) =>{
        console.log("Service:erorr Course get/id method data---->>2",data)
        compCB(data, true)}
      });
  }

  delete(id:Number,compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in Course service delete method");
    let url = this.endpoint + "delete/" + id;
    this.http.get(url).subscribe({
      next:(data) => {
        console.log("Course Service delete/id method:Success data---->>1",data)
        compCB(data)
      },
      error:(data) =>{
        console.log("Course Service delete/id method:Erorr data---->>2",data)
        compCB(data, true)}
      });
  }

  search(form:any, compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in Course service search method");
    let url = this.endpoint + 'search/';
    this.http.post(url,form).subscribe({
      next:(data) => {
        console.log("Course Service search method:Success data---->>1",data)
        compCB(data)
      },
      error:(data) =>{
        console.log("Course Service search method:Error data---->>2",data)
        compCB(data, true)}
      });
  }

  save(form:any,compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in Course service save method");
    let url = this.endpoint + 'save/';
    this.http.post(url,form).subscribe({
      next:(data) => {
        console.log("Course Service save method:Success data---->>1",data)
        compCB(data)
      },
      error:(data) =>{
        console.log("Course Service save method:Error data---->>2",data)
        compCB(data, true)}
      }); 
  }

}