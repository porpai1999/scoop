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

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
    let uid = acRouter.snapshot.params[''];
  }
  
  login() {
    console.log(this.email)
    let json = { email : this.email , password : this.password };
    this.http.post('http://localhost:3000/auth/login', json)
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
          this.router.navigateByUrl('/home/'+this.items[2]);
        } else {
          console.log({ message: "login failed" });
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