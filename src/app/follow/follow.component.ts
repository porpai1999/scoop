import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {


  myID;
  show;
  constructor(private http: HttpClient, private router: Router,private acRouter:ActivatedRoute) {

    let id = acRouter.snapshot.params['p3'];

    this.myID = sessionStorage.getItem("keyuser_id");

    http.get('http://localhost:3000/profiler/show_followers/' + id)
      .subscribe(res => {
        if (res) {
          console.log(res);
          this.show = res

        } else {
          console.log('error');

        }
      }, error => {
        console.log(error);

      })
  }

  ngOnInit(): void {
  }
}
