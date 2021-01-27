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
  items = [];
  value;

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
    let uid = acRouter.snapshot.params[''];
  }
  
  login() {
    let json = { email : this.email , password : this.password };
    this.http.post('http://localhost:3000/users/login', json)
    .subscribe(response => {
      if (response) {
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
<<<<<<< HEAD
          this.router.navigateByUrl('/home');
=======
          // this.router.navigate(['/Header',this.items[1]]);
          this.router.navigateByUrl('/home/'+this.items[1]);
>>>>>>> c567ba6e591f6c06bf99c2840c6cdab4bfe274ad
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