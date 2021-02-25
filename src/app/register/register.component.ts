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
  sanitizer;
  file_img:any;
  file :any;

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
    this.stateOptions = [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}];
    this.siteKey = "6LebNC0aAAAAAOC8dWexryo1xwYyLCy8G3Ipa7a7";
    this.recaptcha= false;
  }

  register() {
    if (this.recaptcha==true) {
      console.log(this.first_name);
      
      let json = { photo_id: 0, email: this.email, password: this.password, first_name: this.first_name, last_name: this.last_name, date_of_birth: "0", gender: "0" };
      // this.router.navigateByUrl('/login');
      this.http.post('http://localhost:3000/auth/register', json).subscribe(response => {
        if (response) {
          var formdata: any = new FormData();
          formdata.append("file",this.file);
          
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

  urls="./assets/images/userprofile.png"
  getFile(e) {

    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event:any) => {
        // console.log(reader.result)
        this.urls=event.target.result;
        this.base64 = reader.result
        let json = {
                base64: this.base64
              }
      }
      console.log('file ok');
      this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64);
    } else {
      console.log('No file');
    }
  }

  // getFile(imageInput: any){
  //   console.log(imageInput.files[0]);
  //   let file = imageInput.files[0];
  //   let reader = new FileReader();
  //   let file_img = imageInput.files[0];
  //   this.file = file_img;
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.base64 = reader.result;
  //     let json = {
  //       base64: this.base64
  //     }
  //     console.log(this.base64);
  //     this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64);
  //   };
  // }
 

}
