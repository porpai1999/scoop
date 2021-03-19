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

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
      let ids = acRouter.snapshot.params['p3'];
      this.id = ids;
      this.myID = sessionStorage.getItem("keyuser_id");
      this.http.get('http://localhost:3000/profiler/get_user_image/'+this.id).subscribe(response => {
        this.imgpath = response[0].image;
      });
      console.log(ids);
    }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/profiler/profile/'+this.id)
       .subscribe(response => {
        this.fullname = response[0].first_name +' '+response[0].last_name;
        console.log('fullname :',this.fullname);
        this.http.get('http://localhost:3000/profiler/show_followers_c/'+this.id).subscribe(response => {
          let items = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              items.push(response[key]);
            }
          }
          this.followers = items[0][0].followers
          this.http.get('http://localhost:3000/profiler/show_following_c/'+this.id).subscribe(response => {
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
      }
}
