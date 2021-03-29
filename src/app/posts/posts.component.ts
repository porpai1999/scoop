import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {


  user_id;
  text;
  host

  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
      let id = acRouter.snapshot.params['p1'];
      this.user_id = id;
      this.host = data.host
      console.log(this.user_id)
      console.log('id post: -> ',id);

    }
    
    post(){
          let json = {user_id: this.user_id,text:this.text }
          console.log(json)
          this.http.post(this.host+'/users/post/'+this.user_id,json)
          .subscribe(response =>{
            if(response){
              console.log(response)

            }else{
              console.log('error')
            }
          },error =>{
            console.log('error',error)
          }

          )
    }

    

  ngOnInit(): void {
  }

}
