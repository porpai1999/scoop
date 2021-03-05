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
  text;
  name;
  lastn;
  firstn;
  array :any;
  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) {
      let id = acRouter.snapshot.params['p1'];
      this.ids = id;
      console.log('id home page',id);
      
      http.get('http://localhost:3000/profiler/posts_profile/'+this.ids)
      .subscribe(Response=>{
        this.array = Response;
        console.log(Response)
        // this.text = Response.text;
        console.log(this.text)
        
        
      })
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
  async ngOnInit(){
    let response = await this.getname();
    console.log(response)
    this.firstn = response[0].first_name
    this.lastn = response[0].last_name
    this.name = this.firstn+' '+this.lastn
    console.log(this.name)
    
    this.items = [
      {
          label: 'Profile',
          icon: 'pi pi-user',       
      },  
  ];

    // //สร้าง session 
    var data = sessionStorage.getItem("key");
    var data1 = sessionStorage.getItem("token");
    console.log(data1);
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

  async getname(){
    let response = this.http.get('http://localhost:3000/users/select_some/'+this.ids)
    .toPromise()
      return response;
  }

}
