import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {


  results;
  constructor(private http: HttpClient) {

    
  }

  ngOnInit(){
      this.http.get('http://localhost:3000/users/search')
      .subscribe(res=>{
        if(res){
          console.log(res);
          this.results = res
          
        }else{
          console.log('error');     
        }
      },error=>{
        console.log(error);
        
      })
    

  }



}
