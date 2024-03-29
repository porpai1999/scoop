import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-postframeother',
  templateUrl: './postframeother.component.html',
  styleUrls: ['./postframeother.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PostframeotherComponent implements OnInit {


  name;
  array;
  ids;
  firstn;
  lastn;
  indexofComment;
  comment;
  user_id;
  post_id;
  p2;
  comments;
  msgs: Message[] = [];

  position: string;

  myID;
  indexOfPosts;
  account_name;
  post_len;
  like_len;
  is_liked: any;
  host

  user_img;

  constructor(private acRouter: ActivatedRoute, private http: HttpClient, private router: Router,
    private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private data: DatapassService) {
    let id = acRouter.snapshot.params['p3'];
    this.host = data.host
    this.ids = id;
    this.myID = sessionStorage.getItem("keyuser_id");
    this.user_img = sessionStorage.getItem("user_img")
    console.log('id postframe page', id);
    http.get(this.host+'/profiler/posts_profile/' + this.ids)
      .subscribe((Response: any) => {
        this.array = Response;
        console.log(Response)
      })
    
  }

  async ngOnInit() {
    let response = await this.getname();
    console.log(response)
    this.firstn = response[0].first_name
    this.lastn = response[0].last_name
    this.name = this.firstn + ' ' + this.lastn
    console.log(this.name)

    this.primengConfig.ripple = true;

  }
  async getname() {
    let response = this.http.get(this.host+'/users/select_some/' + this.ids)
      .toPromise()
    return response;
  }
  isToggle(e) {
    this.indexofComment = e;
    this.comment = "";
    this.user_id = this.array[this.indexofComment].user_id;
    this.post_id = this.array[this.indexofComment].post_id;

    this.http.get(this.host+'/users/show_comment/' + this.post_id)
      .subscribe(response => {
        if (response) {
          this.comments = response


        } else {
          console.log('error')
        }
      }, error => {
        console.log('error', error)
      }

      )
  }
  
  postBy(e) {
    //console.log("e : "+e)
    this.indexOfPosts = e;
    this.account_name = this.array[this.indexOfPosts].first_name + " " + this.array[this.indexOfPosts].last_name
    // console.log(this.array[this.indexOfPosts].first_name)
  }

  async onComment(comment) {
    console.log("Comment"+comment);
    let comment_json = { post_id: this.post_id, text: this.comment, user_id: this.user_id };
    await this.http.post(this.host+'/users/comment/' + this.myID, comment_json).subscribe(response => {
      if (response) {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
        console.log('posted');
      } else {
        console.log('Status : failed');
      }
    });
  }

  like(post_id) {
    let json = { post_id: post_id, user_id: this.myID }
    console.log(json)
    console.log(post_id)
    // console.log(user_id)
    
    this.http.post(this.host+'/users/like_post/' + this.myID, json)
      .subscribe(response => {
        if (response) {
          console.log(response)
          console.log(this.ids)
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/profile/'+this.myID]);
          });

        } else {
          console.log('error')
        }
      }, error => {
        console.log('error', error)
      }

      )
  }

  unlike(post_id) {
    let json = { post_id: post_id, user_id: this.myID }
    console.log(json)
    console.log(post_id)
    // console.log(user_id)
    
    this.http.post(this.host+'/users/unlike_post/' + this.myID, json)
      .subscribe(response => {
        if (response) {
          console.log(response)
          console.log(this.ids)
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/profile/'+this.myID]);
          });

        } else {
          console.log('error')
        }
      }, error => {
        console.log('error', error)
      }

      )
  }

  likedIt(pid) {
    for (let i=0 ; i < this.like_len ; i++) {
      if(this.is_liked[i].post_id == pid) {
        console.log(pid);
        console.log(this.is_liked[i].post_id);
        return 1
      }
    }
  }

  linkTo(id) {
    if( id != sessionStorage.getItem("keyuser_id")) {
      this.router.navigateByUrl('/otherprofile/'+id);
    } else {
      this.router.navigateByUrl('/profile/'+id);
    }
    
  }

  

}
