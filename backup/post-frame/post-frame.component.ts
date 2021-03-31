import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { DatapassService } from '../datapass.service';



@Component({
  selector: 'app-post-frame',
  templateUrl: './post-frame.component.html',
  styleUrls: ['./post-frame.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class PostFrameComponent implements OnInit {

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
  like_len;
  is_liked:any;

  user_img;
  host
  post_data: any;


  constructor(private acRouter: ActivatedRoute, private http: HttpClient, private router: Router,
    private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private data: DatapassService) {
    // let id = acRouter.snapshot.params['p3'];
    // this.ids = id;
    this.host = data.host
    this.myID = sessionStorage.getItem("keyuser_id");
    console.log('id postframe page', this.myID);
    this.http.get(this.host+'/profiler/get_user_image/'+this.myID).subscribe(response => {
        this.user_img = response[0].image;
      });
    http.get(this.host+'/profiler/posts_profile/' + this.myID)
      .subscribe((Response: any) => {
        this.array = Response;
        console.log(Response)

      })

      this.http.get(this.host+'/profiler/user_liked_post/')
          .subscribe(res =>{
            if (res) {
              this.is_liked = res;
              this.post_data = {
                Response,
                res
              }
              console.log(this.post_data.res);
              this.like_len = this.is_liked.length;
              console.log("res2");
              console.log(this.is_liked[0].liked)
              console.log("end");
            }
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
    let response = this.http.get(this.host+'/users/select_some/' + this.myID)
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
  confirm2(e) {

    this.indexofComment = e;
    this.user_id = this.array[this.indexofComment].user_id;
    this.post_id = this.array[this.indexofComment].post_id;
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',

      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
        this.http.get(this.host+'/users/delete_post/' + this.post_id)
          .subscribe(response => {
            if (response) {
              console.log(this.post_id);
              console.log("deleted");
              this.router.navigateByUrl('/profile/' + this.user_id + '/');
            } else {
              console.log('error')
            }
          }, error => {
            console.log('error', error)
          }

          )
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  postBy(e) {
    //console.log("e : "+e)
    this.indexOfPosts = e;
    this.account_name = this.array[this.indexOfPosts].first_name + " " + this.array[this.indexOfPosts].last_name
    // console.log(this.array[this.indexOfPosts].first_name)
  }

  async onComment(comment) {
    console.log("Comment" + comment);
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

  likedIt(pid) {
    for (let i=0 ; i < this.like_len ; i++) {
      if(this.is_liked[i].post_id == pid) {
        console.log(pid);
        console.log(this.is_liked[i].post_id);
        // this.liked_c = this.is_liked[i].liked
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


}
