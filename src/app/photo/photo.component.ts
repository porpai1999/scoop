import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  myID;
  id;
  array;
  host;
  followers;
  following;
  user_img;
  fullname;

  constructor(private router: Router, private data: DatapassService, private http: HttpClient, private acRouter : ActivatedRoute) {
    this.myID = sessionStorage.getItem("keyuser_id");
    let ids = acRouter.snapshot.params['p3'];
    console.log("ids:");
    
    console.log(ids);
    
    this.id = ids;
    this.host = data.host;
    this.http.get(this.host + "/profiler/show_user_image/"+ ids).subscribe(response => {
      this.array = response
      // this.user_img = response[0].image;
      console.log(this.array);
    });
    this.http.get(this.host+'/profiler/get_user_image/'+ids).subscribe(response => {
      this.user_img = response[0].image;
    });
  }

  ngOnInit(): void {
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
          this.followers = items[0][0].followers
          this.http.get(this.host+'/profiler/show_following_c/'+this.id).subscribe(response => {
          let items = [];
            for (let key in response) {
              if (response.hasOwnProperty(key)) {
                items.push(response[key]);
              }
            }
            this.following = items[0][0].following
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
      linkTo(id) {
        if( id != sessionStorage.getItem("keyuser_id")) {
          this.router.navigateByUrl('/otherprofile/'+id);
        } else {
          this.router.navigateByUrl('/profile/'+id);
        }
    
      }
}
