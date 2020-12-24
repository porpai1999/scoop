import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  register() {
    console.log("Name : "+this.name + ", Surname : "+this.surname + ", Username : "+this.username + ", Password : "+this.password);
    console.log("birthDay : "+this.birthDay);
  }

  ngOnInit(): void {
  }

}
