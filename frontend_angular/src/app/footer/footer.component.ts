import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  login_id:any= '';

  ngOnInit():void{
    this.login_id = localStorage.getItem("loginId");
  }

  isNull(){
    console.log("footer component isNull()")
    this.login_id = localStorage.getItem("loginId");
    if(this.login_id == null){
      return true;
    }
    else{
      return false
    }


  }


}
