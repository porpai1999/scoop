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
  gender: string = "";
  stateOptions: any[];

  constructor() { 
    
    this.stateOptions = [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}];
  }

  register() {
    let date = ("0" + this.birthDay.getDate()).slice(-2);
    let month = ("0" + (this.birthDay.getMonth() + 1)).slice(-2);
    let year = this.birthDay.getFullYear();
    let birthDay = year + "-" + month + "-" + date;
    console.log("Name : "+this.name + ", Surname : "+this.surname + ", Username : "+this.username + ", Password : "+this.password);
    console.log("BirthDay : "+ birthDay);
    console.log("Gender : "+ this.gender);
  }

  ngOnInit(): void {
  }

}
