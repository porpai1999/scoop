import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  myID;
  array;
  host;

  constructor(private router: Router, private data: DatapassService, private http: HttpClient, private acRouter : ActivatedRoute) {
    this.myID = sessionStorage.getItem("keyuser_id");
    let ids = acRouter.snapshot.params['p3'];
    this.host = data.host;
    this.http.get(this.host + "/profiler/show_user_image/"+ ids).subscribe(response => {
      this.array = response
      console.log(this.array);
    });

  }

  ngOnInit(): void {

  }

}
