import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  //Rest Endpoint
  endpoint = "http://localhost:8000/ORSAPI/Registration/";

  constructor(private http: HttpClient) { }

  save(form:any, compCB:any){

    console.log("compCB---->>",compCB);
    console.log("in regisration service save method");
    let url = this.endpoint + 'save';
    this.http.post(url,form).subscribe(
      function success(data) {
        console.log(" Success registation save data---->>1",data)
        compCB(data)
      },
      function fail(data) {
        console.log("error registration save data---->>2",data)
        compCB(data, true)}
      );

  }

}
