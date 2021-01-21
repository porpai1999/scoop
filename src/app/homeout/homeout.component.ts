import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homeout',
  templateUrl: './homeout.component.html',
  styleUrls: ['./homeout.component.css']
})
export class HomeoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //สร้าง session 
    sessionStorage.homeout = "Homeout";
    if(typeof(Storage) !== "undefined"){
      if(sessionStorage.clickcountHomeout){
        sessionStorage.clickcountHomeout = Number(sessionStorage.clickcountHomeout)+1;
        console.log("Creating a success session...");
      }
      else{
        sessionStorage.clickcountHomeout = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result")+ sessionStorage.clickcountHomeout ;
    }
    else{
      sessionStorage.getItem("result");
    }
    
  }
}


