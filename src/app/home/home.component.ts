import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  name;
  lastn;
  firstn;
  array :any;
  indexofComment;
  indexOfPosts;
  account_name;

  user_id;
  post_id;

  comment;

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient , public dialog: MatDialog) {
      // this.displayModal = true;
      let id = acRouter.snapshot.params['p1'];
      this.ids = id;
      console.log('id home page',id);
      
      http.get('http://localhost:3000/profiler/posts/')
      .subscribe(Response=>{
        this.array = Response;
        console.log(Response)
        console.log(this.array[0].post_id)
      })

      let id1 = acRouter.snapshot.params['p2'];
      this.user_id = id1;
      console.log(this.user_id)
      console.log('id post: -> ',id1);
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
    // this.displayModal=true;
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
    let response = this.http.get('http://localhost:3000/users/select_some')
    .toPromise()
      return response;
  }
  isToggle(e){
    this.indexofComment = e;
    this.comment="";
    this.user_id = this.array[this.indexofComment].user_id;
    this.post_id = this.array[this.indexofComment].post_id;
  }

  postBy(e) {
    //console.log("e : "+e)
    this.indexOfPosts = e;
    this.account_name = this.array[this.indexOfPosts].first_name + " " + this.array[this.indexOfPosts].last_name
   // console.log(this.array[this.indexOfPosts].first_name)
  }

   async onComment(comment) {
    console.log(comment);
    let comment_json = {post_id: this.post_id, text: this.comment, user_id: this.user_id};
    await this.http.post('http://localhost:3000/users/comment/'+this.ids, comment_json).subscribe(response => {
      if (response) {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
        console.log('posted');
      } else {
        console.log('Status : failed');
      }
    });
  }
}




