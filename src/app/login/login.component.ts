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
  username;
  password;

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
    let uid = acRouter.snapshot.params[''];
  }
  login2() {
    this.data.account = [
      {username : this.username},
      {password : this.password}
    ];
    let request = this.http.get('http://localhost:3000/login/hello')
    .subscribe(response => {
      console.log('respone : ' + JSON.stringify(response));
    }, error => {
      console.log('Error : ' + JSON.stringify(error));
    });
    //request.unsubscribe();
    console.log(this.username);
    console.log(this.password);
  }

  login() {
    let json = { username : this.username , password : this.password };
    this.http.post('http://localhost:3000/login/auth', json)
    .subscribe(response => {
      if (response) {
        console.log('Status : Correct');
      }else {
        console.log('Status : Incorrect');
      }
    }, error => {
      console.log('Error!');
    });
  }

  showRegister() {
      this.displayModal = true;
  }

  ngOnInit(): void {
  }

}