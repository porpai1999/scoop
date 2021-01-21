import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
          label: 'Profile',
          icon: 'pi pi-user',       
      },  
  ];
    //สร้าง session 
    sessionStorage.home = "Home";
    //var home = sessionStorage.home; 
    if(typeof(Storage) !== "undefined"){
      if(sessionStorage.clickcountHome){
        sessionStorage.clickcountHome = Number(sessionStorage.clickcountHome)+1;
        console.log("Creating a success session...");
      }
      else{
        sessionStorage.clickcountHome = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result")+ sessionStorage.clickcountHome ;
    }
    else{
      sessionStorage.getItem("result");
    }
  }

}
