import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  id;
  stateOptions: any[];
  gender: string = "";
  constructor(private http: HttpClient,private acRouter: ActivatedRoute) { 
    let ids = acRouter.snapshot.params['p1'];
      this.id = ids;
      console.log(ids);
      this.stateOptions = [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}];
  }

  ngOnInit(): void {
  }
  
  
}
