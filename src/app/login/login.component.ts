import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  login() {
    this.data.account = [
      {username : this.username},
      {password : this.password}
    ];
    let request = this.http.get('http://localhost:3000/hello')
    .subscribe(response => {
      console.log('respone : ' + JSON.stringify(response));
    }, error => {
      console.log('Error : ' + JSON.stringify(error));
    });
    console.log(this.username);
    console.log(this.password);
  }

  showRegister() {
      this.displayModal = true;
  }

  ngOnInit(): void {
  }

}
