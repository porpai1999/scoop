import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  stateOptions: any[];
  gender: string = "";

  constructor() 
  {
    this.stateOptions = [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}];
   }

  ngOnInit(): void {
  }
  
}
