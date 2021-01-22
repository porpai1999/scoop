import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // var da = sessionStorage.getItem('value');
    // this.data = da;
    // console.log(this.data);

      //สร้าง session 
      sessionStorage.profile = "Profile";
      if(typeof(Storage) !== "undefined"){
        if(sessionStorage.clickcountProfile){
          sessionStorage.clickcountProfile = Number(sessionStorage.clickcountProfile)+1;
          console.log("Creating a success session...");
        }
        else{
          sessionStorage.clickcountProfile = 1;
          console.log("Start creating sessions...");
        }
        sessionStorage.getItem("result")+ sessionStorage.clickcountProfile ;
      }
      else{
        sessionStorage.getItem("result");
      }
  }

}
