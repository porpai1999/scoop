import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
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

  //constructor(private http: HttpClient) { }
  // email:string[];
  ids;
  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) {
      let id = acRouter.snapshot.params['p1'];
      this.ids = id;
      console.log('id home page',id);
    }
  items: MenuItem[];
  email;


  // list(){
  //   console.log('Ok');
  //   let request = this.http.get('http://localhost:3000/users/profiler')
  //     .subscribe(response =>{
  //       console.log('Response: '+ JSON.stringify(response) );
  //     },error =>{
  //       console.log('Error: '+ JSON.stringify(error));
  //     });
  //   console.log("Continue");
  //   console.log("Next statement");
  // }
  ngOnInit(): void {
    
    this.items = [
      {
          label: 'Profile',
          icon: 'pi pi-user',       
      },  
  ];

    // //สร้าง session 
    var data = sessionStorage.getItem("key");
    var data1 = sessionStorage.getItem("keyemail");
//----------------------------------------------------
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
