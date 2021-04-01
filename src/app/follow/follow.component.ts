import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {


  myID;
  show;
  ids;
  fullname;
  user_img;
  followers_c;
  following_c;
  list_userID;
  host;
  array;

  constructor(private http: HttpClient, private router: Router,private acRouter:ActivatedRoute, private data: DatapassService) {

    let id = acRouter.snapshot.params['p3'];
    this.ids = id;
    this.host=data.host;

    this.myID = sessionStorage.getItem("keyuser_id");

    http.get(this.host+'/profiler/show_followers/' + id)
      .subscribe(res => {
        if (res) {
          console.log(res);
          this.show = res
        } else {
          console.log('error');

        }
      }, error => {
        console.log(error);

      });
      this.http.get(this.host+'/profiler/get_user_image/'+ id).subscribe(response => {
        this.user_img = response[0].image;
      });
  }

  ngOnInit(): void {
    console.log("this.show.user_id");
    const token= "Bearer "+ sessionStorage.getItem("token");
    console.log('token: '+sessionStorage.getItem("token"))
    const httpHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization' : token
    });
    
    this.http.get(this.host+'/profiler/profile/'+this.ids, {headers: httpHeaders})
       .subscribe(response => {
        this.fullname = response[0].first_name +' '+response[0].last_name;
        console.log('fullname :',this.fullname);
        this.http.get(this.host+'/profiler/show_followers_c/'+this.ids).subscribe(response => {
          let items = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              items.push(response[key]);
            }
          }
          this.followers_c = items[0][0].followers
          this.http.get(this.host+'/profiler/show_following_c/'+this.ids).subscribe(response => {
          let items = [];
            for (let key in response) {
              if (response.hasOwnProperty(key)) {
                items.push(response[key]);
              }
            }
            this. following_c = items[0][0].following
        });
        });
      },error =>{
        console.log(error);
      });
    
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
  photos(){
    //สร้าง session 
    sessionStorage.photos = "Photos";
    if(typeof(Storage) !== "undefined"){
      if(sessionStorage.clickcountPhotos){
        sessionStorage.clickcountPhotos = Number(sessionStorage.clickcountPhotos)+1;
        console.log("Creating a success session...");
      }
      else{
        sessionStorage.clickcountPhotos = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result")+ sessionStorage.clickcountPhotos ;
    }
    else{
      sessionStorage.getItem("result");
    }
  }
  followers(){
    //สร้าง session 
    sessionStorage.followers = "Followers";
    if(typeof(Storage) !== "undefined"){
      if(sessionStorage.clickcountFollowers){
        sessionStorage.clickcountFollowers = Number(sessionStorage.clickcountFollowers)+1;
        console.log("Creating a success session...");
      }
      else{
        sessionStorage.clickcountFollowers = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result")+ sessionStorage.clickcountFollowers ;
    }
    else{
      sessionStorage.getItem("result");
    }
  }
  following(){
    //สร้าง session 
    sessionStorage.following = "Following";
    if(typeof(Storage) !== "undefined"){
      if(sessionStorage.clickcountFollowing){
        sessionStorage.clickcountFollowing = Number(sessionStorage.clickcountFollowing)+1;
        console.log("Creating a success session...");
      }
      else{
        sessionStorage.clickcountFollowing = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result")+ sessionStorage.clickcountFollowing ;
    }
    else{
      sessionStorage.getItem("result");
    }
  }

  linkTo(id) {
    if( id != sessionStorage.getItem("keyuser_id")) {
      this.router.navigateByUrl('/otherprofile/'+id);
    } else {
      this.router.navigateByUrl('/profile/'+id);
    }
    
  }

  public listUser(x) {
    this.list_userID = x 
  }
    
}
