import { Component, OnInit } from '@angular/core';
import { DatapassService } from '../datapass.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private datapass : DatapassService, private http: HttpClient) { 
    console.log('Username : '+ datapass.account[0].username);
  }

  listUser() {

  }

  ngOnInit(): void {
    // let request = this.http.get('http://localhost:3000/');
    console.log('ok');
  }

}
