import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(private http: HttpClient,private acRouter: ActivatedRoute,private router:Router) { 
    let ids = acRouter.snapshot.params['p1'];
      this.id = ids;
      console.log(ids);
      this.stateOptions = [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}];
      this.http.get('http://localhost:3000/profiler/profile/'+this.id)
    .subscribe(response =>{
      console.log(response)
      this.user = response[0];
      console.log(response[0])
      this.first_name = response[0].first_name;
      this.last_name = response[0].last_name;
      this.email = response[0].email;
    },error=>{
      console.log('error')

    });

  }

  saveprofile(){
    let json = { email: this.email,first_name:this.first_name,last_name: this.last_name };
    this.http.put('http://localhost:3000/users/update/'+this.id,json,{observe:'response'})
    .subscribe(response=>{
      if (response) {
        console.log(response.body);
        console.log(response.status);
        if(response.status === 200){
          console.log('Back profile page');
          this.router.navigateByUrl('/profile/'+this.id);
        }else{
          console.log('Error');
        }
      }else{
        console.log('Login fail');
      }
    },error=>{
      console.log('error');
    });
  }

  ngOnInit(): void {
  }
  // urls = "http://ssl.gstatic.com/accounts/ui/avatar_2x.png";
  // getFile(e) {
  //   if (e.target.files) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(e.target.files[0])
  //     reader.onload = (event:any) => {
  //       // console.log(reader.result)
  //       this.urls=event.target.result;
  //       this.base64 = reader.result
  //     }
  //     console.log('file ok');
  //   } else {
  //     console.log('No file');
  //   }
  // }
}
