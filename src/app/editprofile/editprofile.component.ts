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
  constructor(private http: HttpClient,private acRouter: ActivatedRoute) { 
    let ids = acRouter.snapshot.params['p1'];
      this.id = ids;
      console.log(ids);
  }

  ngOnInit(): void {
  }
  
  
}
