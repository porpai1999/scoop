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
  filename;
  base64;
  url;

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
    this.stateOptions = [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}];
    this.siteKey = "6LebNC0aAAAAAOC8dWexryo1xwYyLCy8G3Ipa7a7";
    this.recaptcha= false;
  }

  register() {
    if (this.recaptcha==true) {
      console.log(this.first_name);
      // let date = ("0" + this.birthDay.getDate()).slice(-2);
      // let month = ("0" + (this.birthDay.getMonth() + 1)).slice(-2);
      // let year = this.birthDay.getFullYear();
      // let date_of_birth = year + "-" + month + "-" + date;
      let json = { photo_id: 0, email: this.email, password: this.password, first_name: this.first_name, last_name: this.last_name, date_of_birth: "0", gender: "0" };
      // this.router.navigateByUrl('/login');
      this.http.post('http://localhost:3000/auth/register', json).subscribe(response => {
        if (response) {
          console.log(response);
          console.log(json);
          let jsonObj: any = response;
          this.url = jsonObj.url;
          this.router.navigateByUrl('/login');
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
  getFile(target: EventTarget) {

    let files = (target as HTMLInputElement).files;
    if (files != null) {
      // console.log(files[0].name)
      let file = files[0]
      this.filename = file?.name
      console.log(this.filename)
      let reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => {
        // console.log(reader.result)
        this.base64 = reader.result
      }
      console.log('file ok');
    } else {
      console.log('No file');
    }
  }

}
