import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  id;
  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
      
      let ids = acRouter.snapshot.params['p1'];
      this.id = ids;
      console.log(this.id);
      
    }

  ngOnInit(): void {
    // this.http.get('http://localhost:3000/users/select_some/'+this.emails)
    //    .subscribe(data => {
    //     console.log(data);
    //   },error =>{
    //     console.log(error);
    //   });
  }

}
