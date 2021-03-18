import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
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
  array: any;
  indexofComment;
  indexOfPosts;
  account_name;
  comment;

  text1: string = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';
  

  user_id;
  post_id;

  comments ;

  displayMaximizable: boolean;
  text2: string;

  is_liked: any;
  liked;

  post_data: any;

  text;

  myID;
  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient , public dialog: MatDialog) {
      // this.displayModal = true;
      let id = acRouter.snapshot.params['p1'];
      this.ids = id;
      
      console.log('id home page',id);
      
      this.myID = sessionStorage.getItem("keyuser_id");

      http.get('http://localhost:3000/profiler/home_posts/')
      .subscribe(Response=>{
        this.array = Response;
        console.log("res1");
        
        console.log(this.array)
        console.log(this.array[0].post_id)

        this.http.get('http://localhost:3000/profiler/user_liked_post/')
          .subscribe(res =>{
            if (res) {
              this.is_liked = res;
              
              
              this.post_data = {
                Response,
                res
              }

              console.log(this.post_data.res);
              
              console.log("res2");
              console.log(this.is_liked)
            }
          })

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
  async ngOnInit() {
    let response = await this.getname();
    console.log(response)
    this.firstn = response[0].first_name
    this.lastn = response[0].last_name
    this.name = this.firstn+' '+this.lastn
    console.log(this.name)
    // this.displayModal=true;
    this.name = response;

    // let selectcommen = this.selectcomment();
    // console.log(selectcommen);
    
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
      },
    ];

    // //สร้าง session 
    var data = sessionStorage.getItem("key");
    var data1 = sessionStorage.getItem("token");
    var datause = sessionStorage.getItem("token1");
    console.log(datause);
//----------------------------------------------------
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

  async getname() {
    let response = this.http.get('http://localhost:3000/users/select_some')
      .toPromise()
    return response;
  }
  isToggle(e) {
    this.indexofComment = e;
    this.comment = "";
    this.user_id = this.array[this.indexofComment].user_id;
    this.post_id = this.array[this.indexofComment].post_id;

    this.http.get('http://localhost:3000/users/show_comment/'+this.post_id)
      .subscribe(response => {
        if (response) {
          this.comments = response
       

        } else {
          console.log('error')
        }
      }, error => {
        console.log('error', error)
      }

      )
  }

  postBy(e) {
    //console.log("e : "+e)
    this.indexOfPosts = e;
    this.account_name = this.array[this.indexOfPosts].first_name + " " + this.array[this.indexOfPosts].last_name
    // console.log(this.array[this.indexOfPosts].first_name)
  }

  async onComment(comment) {
    console.log("Comment"+comment);
    let comment_json = { post_id: this.post_id, text: this.comment, user_id: this.user_id };
    await this.http.post('http://localhost:3000/users/comment/' + this.ids, comment_json).subscribe(response => {
      if (response) {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
        console.log('posted');
      } else {
        console.log('Status : failed');
      }
    });
  }
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  like(post_id) {
    let json = { post_id: post_id, user_id: this.ids }
    console.log(json)
    console.log(post_id)
    // console.log(user_id)
    
    this.http.post('http://localhost:3000/users/like_post/' + this.ids, json)
      .subscribe(response => {
        if (response) {
          console.log(response)
          console.log(this.ids)

        } else {
          console.log('error')
        }
      }, error => {
        console.log('error', error)
      }

      )
  }

  post(){
    let json = {user_id:  this.ids,text: this.text }
    console.log(this.text);
    
    console.log(json)
    this.http.post('http://localhost:3000/users/post/'+this.ids,json)
    .subscribe(response =>{
      if(response){
        console.log(response)

      }else{
        console.log('error')
      }
    },error =>{
      console.log('error',error)
    }

    )

  }

}




