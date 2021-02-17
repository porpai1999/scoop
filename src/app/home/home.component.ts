import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // email:string[];
  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) {
      let email = acRouter.snapshot.params['p1'];
      console.log('email',email);
    }
  items: MenuItem[];

  ngOnInit(): void {
    
    this.items = [
      {
          label: 'Profile',
          icon: 'pi pi-user',       
      },  
  ];
    var data = sessionStorage.getItem("key");
    var data1 = sessionStorage.getItem("keyemail");
    
    // //สร้าง session 
    // sessionStorage.home = "Home";
    // //var home = sessionStorage.home; 
    // if(typeof(Storage) !== "undefined"){
    //   if(sessionStorage.clickcountHome){
    //     sessionStorage.clickcountHome = Number(sessionStorage.clickcountHome)+1;
    //     console.log("Creating a success session...");
    //   }
    //   else{
    //     sessionStorage.clickcountHome = 1;
    //     console.log("Start creating sessions...");
    //   }
    //   sessionStorage.getItem("result")+ sessionStorage.clickcountHome ;
    // }
    // else{
    //   sessionStorage.getItem("result");
    // }
  }

}
