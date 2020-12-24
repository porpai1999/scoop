import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  displayModal: boolean;
  username;
  password;

  constructor() { 
  }

  login() {
    console.log(this.username);
    console.log(this.password);
  }

  showRegister() {
      this.displayModal = true;
  }

  ngOnInit(): void {
  }

}
