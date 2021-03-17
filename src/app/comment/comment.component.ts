import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {


  user_id;
  constructor(private http: HttpClient,private acRouter:ActivatedRoute) {

    let id = acRouter.snapshot.params['p1'];
    console.log('id comment',id)
    this.user_id = id;
    // http.get('http://localhost:3000/po/')
   }

  ngOnInit(): void {
  }

}
