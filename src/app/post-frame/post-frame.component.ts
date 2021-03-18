import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';



@Component({
  selector: 'app-post-frame',
  templateUrl: './post-frame.component.html',
  styleUrls: ['./post-frame.component.css'],
  providers: [ConfirmationService,MessageService]
  
})
export class PostFrameComponent implements OnInit {

  name;
  array;
  ids;
  firstn;
  lastn;
  indexofComment;
  p2;
  msgs: Message[] = [];

  position: string;


  constructor(private acRouter:ActivatedRoute,private http:HttpClient,private router: Router,
    private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) {
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

    this.primengConfig.ripple = true;

  }
  async getname(){
    let response = this.http.get('http://localhost:3000/users/select_some/'+this.ids)
    .toPromise()
      return response;
  }
  isToggle(e){
    this.indexofComment = e;
  }
   confirm2() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
            }
        });
    }
  //   confirmPosition(position: string) {
  //     this.position = position;

  //     this.confirmationService.confirm({
  //         message: 'Do you want to delete this record?',
  //         header: 'Delete Confirmation',
  //         icon: 'pi pi-info-circle',
  //         accept: () => {
  //             this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
  //         },
  //         reject: () => {
  //             this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
  //         },
  //         key: "positionDialog"
  //     });
  // }
  // click(){
  //   this.p2 = 

  // }

}
