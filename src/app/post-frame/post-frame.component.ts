import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';



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

  constructor(private acRouter: ActivatedRoute, private http: HttpClient, private router: Router,
    private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) {
    let id = acRouter.snapshot.params['p1'];
    this.ids = id;
    this.myID = sessionStorage.getItem("keyuser_id");
    console.log('id postframe page', id);
    http.get('http://localhost:3000/profiler/posts_profile/' + this.myID)
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
    let response = this.http.get('http://localhost:3000/users/select_some/' + this.ids)
      .toPromise()
    return response;
  }
  isToggle(e) {
    this.indexofComment = e;
    this.comment = "";
    this.user_id = this.array[this.indexofComment].user_id;
    this.post_id = this.array[this.indexofComment].post_id;

    this.http.get('http://localhost:3000/users/show_comment/' + this.post_id)
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
        this.http.delete('http://localhost:3000/users/delete_post/' + this.post_id)
          .subscribe(response => {
            if (response) {
              console.log(this.post_id);
              this.router.navigateByUrl('/profile/'+this.user_id+'/');
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
    console.log("Comment"+comment);
    let comment_json = { post_id: this.post_id, text: this.comment, user_id: this.user_id };
    await this.http.post('http://localhost:3000/users/comment/' + this.ids, comment_json).subscribe(response => {
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
    let json = { post_id: post_id, user_id: this.ids }
    console.log(json)
    console.log(post_id)
    // console.log(user_id)
    
    this.http.post('http://localhost:3000/users/like_post/' + this.ids, json)
      .subscribe(response => {
        if (response) {
          console.log(response)
          console.log(this.ids)

        } else {
          console.log('error')
        }
      }, error => {
        console.log('error', error)
      }

      )
  }
}
