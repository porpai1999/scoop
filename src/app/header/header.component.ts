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
  searchs;


  constructor(private router : Router, private data : DatapassService, private acRouter : ActivatedRoute,
    private http: HttpClient) { 
      
      let ids = acRouter.snapshot.params['p1'];
      this.id = sessionStorage.getItem("keyuser_id");;
      console.log(sessionStorage.getItem("keyuser_id"));
      
      
    }

  ngOnInit(): void {
    
  }
  search(){
    console.log(this.searchs);
    
    this.http.get('http://nodescoop.comsciproject.com/users/search/'+this.searchs)
  .subscribe(res=>{
    if(res){
      console.log(res);
      this.router.navigateByUrl('/search/'+this.id+'/'+this.searchs);
      
    }else{
      console.log('error');     
    }
  },error=>{
    console.log(error);
    
  })
    
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
