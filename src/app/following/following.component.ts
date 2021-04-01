import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {


  myID;
  show;
  id;
  host;
  user_img;
  followings;
  follower;
  fullname;
  array;

  constructor(private http: HttpClient,private acRouter: ActivatedRoute, 
    private router: Router, private data: DatapassService) { 

    let ids = acRouter.snapshot.params['p3'];
    this.id = ids;
    this.myID = sessionStorage.getItem("keyuser_id");
    this.host = data.host

    this.http.get(this.host + "/profiler/show_user_image/"+ this.id).subscribe(response => {
      this.array = response
      this.user_img = response[0].image;
    });
    http.get(this.host+'/profiler/show_following/' + this.id)
    .subscribe(res=>{
      if(res){
        console.log(res);
        this.show = res

      }else{
        console.log('error');
        
      }
    },error=>{
        console.log(error);
        
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
    
    this.http.get(this.host+'/profiler/profile/'+this.id, {headers: httpHeaders})
       .subscribe(response => {
        this.fullname = response[0].first_name +' '+response[0].last_name;
        console.log('fullname :',this.fullname);
        this.http.get(this.host+'/profiler/show_followers_c/'+this.id).subscribe(response => {
          let items = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              items.push(response[key]);
            }
          }
          this.follower = items[0][0].followers
          this.http.get(this.host+'/profiler/show_following_c/'+this.id).subscribe(response => {
          let items = [];
            for (let key in response) {
              if (response.hasOwnProperty(key)) {
                items.push(response[key]);
              }
            }
            this.followings = items[0][0].following
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

}
