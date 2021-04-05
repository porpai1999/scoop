import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  displayModal: boolean;
  email;
  password;
  user_id;
  items = [];
  value;
  host
  user_img
  displayPosition: boolean = false;
  position: string = "";
  loginstatus:number=0;
  displayPosition1: boolean = false;

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
    let uid = acRouter.snapshot.params[''];
    this.host = data.host
    // this.user_img = data.user_img;
  }
  click(){
    console.log("here");
    
    console.log(this.loginstatus);
    
    if (this.loginstatus == 1) {
      this.displayPosition = false;
      this.router.navigateByUrl('/home');
    }
    else{
      this.displayPosition1 = false;
      let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
          // this.displayPosition1 = false;
        });
    }
    
  }

  refesh() {
    
    // let currentUrl = this.router.url;
    //     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //       this.router.navigate([currentUrl]);
          
    //     });
        this.displayPosition1 = false;
  }

  login(position: string) {
    console.log(this.email)
    let json = { email : this.email , password : this.password };
    this.http.post(this.host+'/auth/login', json)
    .subscribe(response => {
      if (response) {
        console.log('res : '+response)
        for (let key in response) {
          if (response.hasOwnProperty(key)) {
            this.items.push(response[key]);
          }
        }
        if (this.items[0]) {
          console.log(this.items);
          this.value = this.items;
          sessionStorage.setItem("key",this.value);
          sessionStorage.setItem("keyemail",this.email);
          sessionStorage.setItem("keyuser_id",this.items[2]);
          sessionStorage.setItem('token1', this.items[2]);
          sessionStorage.setItem('token', this.items[3]);
          console.log(sessionStorage.getItem('token'))
          // this.http.get(this.host+'/profiler/get_user_image/'+this.items[2]).subscribe(response => {
            // this.data.user_img = response[0].image;
          // });

          this.http.get(this.host+'/profiler/get_user_image/'+this.items[2]).subscribe(response => {
            this.user_img = response[0].image; 
            sessionStorage.setItem('user_img', this.user_img);
          });
          // แจ้งเตือน login success------------------
          this.position = position;
          this.displayPosition = true;
          console.log("Success");
          this.loginstatus = 1;
          // this.router.navigateByUrl('/home');
          // this.router.navigateByUrl('/home/'+this.items[2]);
        }
         else {

          console.log({ message: "login failed" });
           // แจ้งเตือน login failed------------------
          this.loginstatus = 0;
          this.position = position;
          this.displayPosition1 = true;
          console.log("failed");
        }
      }else {
        console.log({ message: "no response" });
      }
    }, error => {
      console.log('Error!');
    });
    
    //---- Session ----
    //console.log(this.items);
    sessionStorage.login = "Login";
    if(typeof(Storage) !== "undefined"){
      if(sessionStorage.clickcountLogin){
        sessionStorage.clickcountLogin = Number(sessionStorage.clickcountLogin)+1;
        console.log("Creating a success session...");
      }
      else{
        sessionStorage.clickcountLogin = 1;
        console.log("Start creating sessions...");
      }
      sessionStorage.getItem("result")+ sessionStorage.clickcountLogin ;
    }
    else{
      sessionStorage.getItem("result");
    } 
    console.log('session count : '+sessionStorage.clickcountLogin);
  }

  showRegister() {
      this.displayModal = true;
  }

  ngOnInit(): void {
    
  }

}