import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { clear } from 'console';
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

  displayPosition: boolean = false;
  position: string = "";
  regisstatus:number=0;
  displayPosition1: boolean = false;
  displayPosition2: boolean = false;
  namefeild = [];
  

  //sanitizer;
  file_img:any;
  file :any;

  urls: any = "./assets/images/userprofile.png"
  host

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient, private sanitizer: DomSanitizer, private formBuilder: FormBuilder) { 
    this.stateOptions = [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}];
    this.host = data.host

    this.siteKey = "6LebNC0aAAAAAOC8dWexryo1xwYyLCy8G3Ipa7a7";
    this.recaptcha= false;
  }
  click(){
    if (this.regisstatus == 1) {
      this.displayPosition = false;
      this.router.navigateByUrl('/login');
    }
    else if (this.regisstatus == 0){
      this.displayPosition2 = false;
      this.namefeild = [];
    } 
    else  if (this.regisstatus == 2){
      this.displayPosition1 = false;
    }
  }
  checkvalue(position: string){
    if(this.first_name == undefined){
      this.namefeild.push("--> Name Invalid");
    }
    if (this.last_name == undefined) {
      this.namefeild.push("--> Surname Invalid");
    }
    if (this.email == undefined) {
      this.namefeild.push("--> Email Invalid");
    }
    if(this.password == undefined){
      this.namefeild.push("--> Password Invalid");
    }
    if(this.birthDay == undefined){
      this.namefeild.push("--> Birthday Invalid");
    }
    if (this.gender == undefined) {
      this.namefeild.push("--> Gender Invalid");
    }
    if (this.first_name != undefined && this.last_name != undefined && this.email != undefined && this.password != undefined && this.birthDay != undefined && this.gender != undefined) {
      this.register('top');
    }
    if(this.namefeild.length > 0){
      this.regisstatus = 0;
      this.position = position;
      this.displayPosition2 = true;
      console.log("failed");
    }
    else{
      console.log("++++");
    }
    console.log(this.namefeild);
  }
  register(position: string) {
    let date = new Date();
    let currentDate = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
    let items = [];
    if (this.recaptcha == true) {
      let date_of_birth = this.birthDay.getFullYear() + "-" + (this.birthDay.getMonth()+1) + "-" + this.birthDay.getDate();
      let register_json = { photo_id: 0, email: this.email, password: this.password, first_name: this.first_name, last_name: this.last_name, date_of_birth: date_of_birth, gender: this.gender };
      this.http.post(this.host+'/auth/register', register_json).subscribe(response => {
        if (response) {
          console.log(response);
          let jsonObj: any = response;
          console.log(jsonObj);
          this.url = jsonObj.url;

          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              items.push(response[key]);
              console.log(response[key]);
              
            }
          }
          console.log(items);
          let registered_userID = items[1];
          console.log("1"+registered_userID);
          console.log(this.file);

          if (this.file == undefined) {
            this.router.navigateByUrl('/login');
            console.log(this.file);
          } else {
            let formData: any = new FormData();
            formData.append("file", this.file);
            this.http.post(this.host+'/users/upload_image', formData).subscribe(response => {
              if (response) {
                console.log(response)

                items = [];
                for (let key in response) {
                  if (response.hasOwnProperty(key)) {
                    items.push(response[key]);
                  }
                }
                let uploaded_image_path = items[2];
                console.log("2"+uploaded_image_path);

                let post_json = { text: "", user_id: registered_userID};
                this.http.post(this.host+'/users/post/'+registered_userID, post_json).subscribe(response => {
                      if (response) {

                        items = [];
                        for (let key in response) {
                          if (response.hasOwnProperty(key)) {
                            items.push(response[key]);
                          }
                        }
                        let posted_postID = items[1];
                        console.log("3"+posted_postID);

                        let insert_photos_json = { user_id: registered_userID, post_id: posted_postID, image: uploaded_image_path};
                        this.http.post(this.host+'/users/insert_photos/', insert_photos_json).subscribe(response => {
                          if (response) {

                            items = [];
                            for (let key in response) {
                              if (response.hasOwnProperty(key)) {
                                items.push(response[key]);
                              }
                            }
                            let inserted_photo_id = items[1];
                            console.log("4"+inserted_photo_id);

                            let profile_photo_json = { photo_id: inserted_photo_id };
                            console.log(inserted_photo_id);
                            
                            this.http.post(this.host+'/users/profile_photo/'+registered_userID, profile_photo_json).subscribe(response => {
                              if (response) {
                                this.position = position;
                                this.displayPosition = true;
                                console.log("Success");
                                this.regisstatus = 1;
                                // this.router.navigateByUrl('/login');
                              } else {
                                console.log('Status : insert_failed');
                              }
                            });
                          } else {
                            console.log('Status : insert_failed');
                          }
                        });
                      } else {
                        console.log('Status : insert_failed');
                      }
                    });
              } else {
                console.log('Status : file not found');
              }
            });
          }
        } else {
          console.log('Status : failed');
        }
      }, error => {
        console.log('Error!',error);
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
    } else{
      console.log(`reCaptcha : ${this.recaptcha}`);
      this.regisstatus = 2;
      this.position = position;
      this.displayPosition1 = true;
      console.log("failed");
    }
  }

  ngOnInit(): void {
  }

  handleSuccess($even) {
    this.recaptcha = true;
    console.log(`reCaptcha : ${this.recaptcha}`);
  }

  getFile(imageInput: any){
    console.log(imageInput.files[0]);
    let file = imageInput.files[0];
    let reader = new FileReader();
    let file_img = imageInput.files[0];
    this.file=file_img;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      let json = {
        base64: this.base64
      }
        this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64);
    };
    
  }
}
