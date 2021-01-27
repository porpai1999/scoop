import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  emails;
  fullname;
  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
      let email = acRouter.snapshot.params['p1'];
      this.emails = email;
      console.log('----',this.emails);
    }

  ngOnInit(): void {
<<<<<<< HEAD

    // var da = sessionStorage.getItem('value');
    // this.data = da;
    // console.log(this.data);

      //สร้าง session 
      sessionStorage.profile = "Profile";
      if(typeof(Storage) !== "undefined"){
        if(sessionStorage.clickcountProfile){
          sessionStorage.clickcountProfile = Number(sessionStorage.clickcountProfile)+1;
          console.log("Creating a success session...");
=======
    this.http.get('http://localhost:3000/users/select_some/'+this.emails)
       .subscribe(response => {
        this.fullname = response[0].first_name +' '+response[0].last_name;
        console.log('fullname :',this.fullname);
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
>>>>>>> c567ba6e591f6c06bf99c2840c6cdab4bfe274ad
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
