import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  id;
  result;
  searchs;
  followers;
  user_id;
  items;
  rekey;

  constructor(private http: HttpClient, private acRouter: ActivatedRoute, private router: Router) {
    let ids = acRouter.snapshot.params['p1'];
    this.id = ids;
    let search = acRouter.snapshot.params['p2'];
    this.searchs = search;
    console.log(this.id);
    console.log(this.searchs);

  }

  ngOnInit() {
    this.http.get('http://localhost:3000/users/search/' + this.searchs)
      .subscribe(res => {

        if (res) {
          console.log(res);
          this.result = res
          this.router.navigateByUrl('/search/' + this.id + '/' + this.searchs + '/');

        } else {
          console.log('error');
        }
      }, error => {
        console.log(error);

      })

      
  }




}
