import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.css']
})
export class OtherProfileComponent implements OnInit {

  fullname;
  id;
  imgpath;
  myID
  followers;
  following;

  is_followed;
  host

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
      let ids = acRouter.snapshot.params['p3'];
      this.id = ids;
      this.host = data.host
      this.myID = sessionStorage.getItem("keyuser_id");
      this.http.get(this.host+'/profiler/get_user_image/'+this.id).subscribe(response => {
        this.imgpath = response[0].image;
      });
      console.log(ids);
    }

  ngOnInit(): void {
    this.http.get(this.host+'/profiler/profile/'+this.id)
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
          this.followers = items[0][0].followers
          this.http.get(this.host+'/profiler/show_following_c/'+this.id).subscribe(response => {
          let items = [];
            for (let key in response) {
              if (response.hasOwnProperty(key)) {
                items.push(response[key]);
              }
            }
            this.following = items[0][0].following
            
            let user_followed = {my_id : sessionStorage.getItem("keyuser_id")}
            this.http.post(this.host+'/profiler/user_followed/'+this.id , user_followed).subscribe(response => {
              // this.is_followed = 0;
              this.is_followed = response
              this.is_followed = this.is_followed.length
              console.log("here");
              
              console.log(this.is_followed);
            });
        });
        });
      },error =>{
        console.log(error);
      });
      }

      follow() {
        console.log(this.id);
        console.log(sessionStorage.getItem("keyuser_id"));
        
        
        let json = { myID: sessionStorage.getItem("keyuser_id") }
        this.http.post(this.host+'/users/follow/'+this.id,json).subscribe(response => {
          console.log(response);
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
          
      });
      
      }

      unfollow() {
        console.log(this.id);
        console.log(sessionStorage.getItem("keyuser_id"));
        
        
        let json = { myID: sessionStorage.getItem("keyuser_id") }
        this.http.post(this.host+'/users/unfollow/'+this.id,json).subscribe(response => {
          console.log(response);
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
          
      });
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
      tfollowers(){
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
      tfollowing(){
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

      isFollowed() {
        
      }

      linkTo(id) {
        if( id != sessionStorage.getItem("keyuser_id")) {
          this.router.navigateByUrl('/otherprofile/'+id);
        } else {
          this.router.navigateByUrl('/profile/'+id);
        }
        
      }
}
