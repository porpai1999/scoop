import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {


  myID;
  show;


  constructor(private http: HttpClient) { 
    this.myID = sessionStorage.getItem("keyuser_id");

    http.get('http://localhost:3000/profiler/show_following/' + this.myID)
    .subscribe(res=>{
      if(res){
        console.log(res);
        this.show = res

      }else{
        console.log('error');
        
      }
    },error=>{
        console.log(error);
        
    })
  }

  ngOnInit() {
  }


  

}
