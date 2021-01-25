import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  first_name;
  last_name;
  email;
  password;
  birthDay;
  gender: string = "";
  stateOptions: any[];
  siteKey: string;
  recaptcha: boolean;

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
    this.stateOptions = [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}];
    this.siteKey = "6LebNC0aAAAAAOC8dWexryo1xwYyLCy8G3Ipa7a7";
    this.recaptcha= false;
  }

  register() {
    if (this.recaptcha==false) {
      console.log(this.first_name);
      // let date = ("0" + this.birthDay.getDate()).slice(-2);
      // let month = ("0" + (this.birthDay.getMonth() + 1)).slice(-2);
      // let year = this.birthDay.getFullYear();
      // let date_of_birth = year + "-" + month + "-" + date;
      let json = { photo_id: "0", email: this.email, password: this.password, first_name: this.first_name, last_name: this.last_name, date_of_birth: "0", gender: "0" };
      // this.router.navigateByUrl('/login');
      this.http.post('http://localhost:3000/users/register', json).subscribe(response => {
        if (response) {
          console.log(response);
          console.log(json);
          // this.router.navigateByUrl('/login');
        } else {
          console.log('Status : failed');
        }
      }, error => {
        console.log('Error!');
      });

    //---- Session ---------
    //สร้าง session 
      sessionStorage.register = "Register";
      if(typeof(Storage) !== "undefined"){
        if(sessionStorage.clickcountRegister){
          sessionStorage.clickcountRegister = Number(sessionStorage.clickcountRegister)+1;
          console.log("Creating a success session...");
        }
        else{
          sessionStorage.clickcountRegister = 1;
          console.log("Start creating sessions...");
        }
        sessionStorage.getItem("result")+ sessionStorage.clickcountRegister ;
      }
      else{
        sessionStorage.getItem("result");
      }
    } else {
      console.log(`reCaptcha : ${this.recaptcha}`);
    }
  }

  ngOnInit(): void {
    
  }

  handleSuccess($even) {
    this.recaptcha = true;
    console.log(`reCaptcha : ${this.recaptcha}`);
  }

}
