import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Provides REST CRUD operations of User functionality
 * Each method of this class receives response callback method
 * Response callback method is called by Observable and passed data and error
 */


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Rest endpoint
  endpoint = "http://localhost:8000/ORSAPI/Login/"
  // locatar:any
  // form:any

  constructor(private http:HttpClient) {}

  auth(form:any,compCB:any){
    console.log("compCB---->>",compCB);
    console.log("in auth service auth method");
    let url = this.endpoint + 'auth';
    this.http.post(url,form).subscribe(
      function success(data) {
        console.log(" Success auth data---->>1",data)
        compCB(data)
      },
      function fail(data){
        console.log("error auth data---->>2",data)
        compCB(data, true)}
      );

    }

}
