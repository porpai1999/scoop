import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  fullname;
  id;
  imgpath;
  myID
  followers;
  following;

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
      let ids = acRouter.snapshot.params['p1'];
      this.id = ids;
      this.myID = sessionStorage.getItem("keyuser_id");
      this.http.get('http://nodescoop.comsciproject.com/profiler/get_user_image/'+this.myID).subscribe(response => {
        this.imgpath = response[0].image;
      });
      //this.imgpath = "http://nodescoop.comsciproject.com/images/jpfunnyface.png"
      console.log(ids);
    }

  ngOnInit(): void {
    const token= "Bearer "+ sessionStorage.getItem("token");
    console.log('token: '+sessionStorage.getItem("token"))
    const httpHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization' : token
    });
    
    this.http.get('http://nodescoop.comsciproject.com/profiler/profile/'+this.id, {headers: httpHeaders})
       .subscribe(response => {
        this.fullname = response[0].first_name +' '+response[0].last_name;
        console.log('fullname :',this.fullname);
        this.http.get('http://nodescoop.comsciproject.com/profiler/show_followers_c/'+this.myID).subscribe(response => {
          let items = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              items.push(response[key]);
            }
          }
          this.followers = items[0][0].followers
          this.http.get('http://nodescoop.comsciproject.com/profiler/show_following_c/'+this.myID).subscribe(response => {
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
}
