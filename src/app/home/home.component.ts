import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
          label: 'Profile',
          icon: 'pi pi-user',
        //   routerLink = "/profile"
          
      },
     
  ];
  }

}
