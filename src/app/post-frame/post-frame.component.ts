import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-post-frame',
  templateUrl: './post-frame.component.html',
  styleUrls: ['./post-frame.component.css']
})
export class PostFrameComponent implements OnInit {

  name;
  array;
  ids;
  firstn;
  lastn;
  indexofComment;


  constructor(private acRouter:ActivatedRoute,private http:HttpClient,private router: Router) {
    let id = acRouter.snapshot.params['p1'];
      this.ids = id;
      console.log('id postframe page',id);
      http.get('http://localhost:3000/profiler/posts_profile/'+this.ids)
      .subscribe((Response : any) =>{
        this.array = Response;
        console.log(Response)

        
      })
   }

  async ngOnInit() {
    let response = await this.getname();
    console.log(response)
    this.firstn = response[0].first_name
    this.lastn = response[0].last_name
    this.name = this.firstn+' '+this.lastn
    console.log(this.name)

  }
  async getname(){
    let response = this.http.get('http://localhost:3000/users/select_some/'+this.ids)
    .toPromise()
      return response;
  }
  isToggle(e){
    this.indexofComment = e;
  }

}
