import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  id;
  user;
  first_name : Object;
  last_name;
  base64;
  email;
  stateOptions: any[];
  gender: string = "";

  //sanitizer;
  file_img:any;
  file :any;
  urls :any = "http://ssl.gstatic.com/accounts/ui/avatar_2x.png";


  constructor(private http: HttpClient,private acRouter: ActivatedRoute,private router:Router, private sanitizer: DomSanitizer) { 
    let ids = acRouter.snapshot.params['p1'];
      this.id = ids;

      console.log(ids);
      this.stateOptions = [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}];
      this.http.get('http://localhost:3000/users/select_some/'+sessionStorage.getItem("keyuser_id"))
      .subscribe(response =>{
      console.log(response)
      this.user = response[0]
      console.log(response[0])
      this.first_name = response[0].first_name;
      console.log(this.first_name)
      this.last_name = response[0].last_name;
      this.email = response[0].email;
    },error=>{
      console.log('error')
    });

  }

  saveprofile(){
    let items = []
    let json = { email: this.email,first_name:this.first_name,last_name: this.last_name };
    this.http.put('http://localhost:3000/users/update/'+this.id,json,{observe:'response'})
    .subscribe(response =>{
      if (response) {
        console.log(response.body);
        if(response.status === 200){
          
          if (this.file == undefined) {
            this.router.navigateByUrl('/profile/'+this.id);
          } else {
            let formData: any = new FormData();
            formData.append("file", this.file);
            this.http.post('http://localhost:3000/users/upload_image', formData).subscribe(response => {
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

                let post_json = { text: ""};
                this.http.post('http://localhost:3000/users/post/'+this.id, post_json).subscribe(response => {
                      if (response) {

                        items = [];
                        for (let key in response) {
                          if (response.hasOwnProperty(key)) {
                            items.push(response[key]);
                          }
                        }
                        let posted_postID = items[1];
                        console.log("3"+posted_postID);

                        let insert_photos_json = { user_id: this.id, post_id: posted_postID, image: uploaded_image_path};
                        this.http.post('http://localhost:3000/users/insert_photos/', insert_photos_json).subscribe(response => {
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
                            this.http.put('http://localhost:3000/users/profile_photo/'+this.id, profile_photo_json).subscribe(response => {
                              if (response) {
                                this.router.navigateByUrl('/profile/'+this.id);
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


          console.log('Back profile page');
          console.log('Status is true ',response.status)
          this.router.navigateByUrl('/profile/'+this.id);
        }else{
          console.log('Error 501');
        }
      }else{
        console.log('Fail Fail');
      }
    },error=>{
      console.log('Error',error);
    });
  }

  ngOnInit(): void {
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
