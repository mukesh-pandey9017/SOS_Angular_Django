import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarksheetService {

  // Reset Endpoint
  endpoint = "http://localhost:8000/ORSAPI/Marksheet/"

  constructor(private http:HttpClient) { }

  get(id:Number,compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in Marksheet service get method");
    let url = this.endpoint + "get/" + id;
    this.http.get(url).subscribe({
      next:(data) => {
        console.log("Service:success Marksheet get/id method data---->>1",data)
        compCB(data)
      },
      error:(data) =>{
        console.log("Service:erorr Marksheet get/id method data---->>2",data)
        compCB(data, true)}
      });
  }

  delete(id:Number,compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in Marksheet service delete method");
    let url = this.endpoint + "delete/" + id;
    this.http.get(url).subscribe({
      next:(data) => {
        console.log("Marksheet Service delete/id method:Success data---->>1",data)
        compCB(data)
      },
      error:(data) =>{
        console.log("Marksheet Service delete/id method:Erorr data---->>2",data)
        compCB(data, true)}
      });
  }

  search(form:any, compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in Marksheet service search method");
    let url = this.endpoint + 'search';
    this.http.post(url,form).subscribe({
      next:(data) => {
        console.log("Marksheet Service search method:Success data---->>1",data)
        compCB(data)
      },
      error:(data) =>{
        console.log("Marksheet Service search method:Error data---->>2",data)
        compCB(data, true)}
      });
  }

  save(form:any,compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in Marksheet service save method");
    let url = this.endpoint + 'save';
    this.http.post(url,form).subscribe({
      next:(data) => {
        console.log("Marksheet Service save method:Success data---->>1",data)
        compCB(data)
      },
      error:(data) =>{
        console.log("Marksheet Service save method:Error data---->>2",data)
        compCB(data, true)}
      }); 
  }
}