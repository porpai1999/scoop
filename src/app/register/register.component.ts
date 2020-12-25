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

  name;
  surname;
  username;
  password;
  birthDay;
  gender: string = "";
  stateOptions: any[];

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
    this.stateOptions = [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}];
  }

  register() {
    let date = ("0" + this.birthDay.getDate()).slice(-2);
    let month = ("0" + (this.birthDay.getMonth() + 1)).slice(-2);
    let year = this.birthDay.getFullYear();
    let birthDay = year + "-" + month + "-" + date;
    let json = { username : this.username, password : this.password, firstname : this.name, lastname : this.surname, 
      address : this.birthDay, phone_number : this.gender, image : '' };
    
    this.http.post('http://localhost:3000/users/insert', json)
    .subscribe(response => {
      if (response) {
        console.log('Status : registered');
        this.router.navigateByUrl('/login');
      }else {
        console.log('Status : failed');
      }
    }, error => {
      console.log('Error!');
    });

  }

  ngOnInit(): void {
    
  }

}
