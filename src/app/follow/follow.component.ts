import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {


  myID;
  show;
  ids;
  constructor(private http: HttpClient, private router: Router,private acRouter:ActivatedRoute) {

    let id = acRouter.snapshot.params['p3'];
    this.ids = id;

    this.myID = sessionStorage.getItem("keyuser_id");

    http.get('http://localhost:3000/profiler/show_followers/' + id)
      .subscribe(res => {
        if (res) {
          console.log(res);
          this.show = res

        } else {
          console.log('error');

        }
      }, error => {
        console.log(error);

      })
  }

  ngOnInit(): void {
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
