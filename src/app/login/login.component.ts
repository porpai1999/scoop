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
  
  login() {
    let json = { username : this.username , password : this.password };
    this.http.post('http://localhost:3000/login/auth', json)
    .subscribe(response => {
      if (response) {
        console.log('Status : Correct');
        this.router.navigateByUrl('/home');
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