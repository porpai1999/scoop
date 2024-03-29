import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CommentComponent } from './comment/comment.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { FeedComponent } from './feed/feed.component';
import { FollowComponent } from './follow/follow.component';
import { FollowingComponent } from './following/following.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenubarComponent } from './menubar/menubar.component';
import { OtherProfileComponent } from './other-profile/other-profile.component';
import { PhotoComponent } from './photo/photo.component';
import { PostFrameComponent } from './post-frame/post-frame.component';
import { PostframeotherComponent } from './postframeother/postframeother.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchListComponent } from './search-list/search-list.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'home/:p1', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'Header/:p1', component: HeaderComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'profile/:p1', component: ProfileComponent},
  { path: 'profile/:p1/', component: ProfileComponent},
  { path: 'feed/:p3', component: FeedComponent},
  { path: 'editprofile/:p1', component: EditprofileComponent},
  { path: 'posts/:p2', component: PostsComponent},
  { path: 'posts', component: PostsComponent},
  { path: 'photo', component: PhotoComponent},
  { path: 'photo/:p3', component: PhotoComponent},
  { path: 'follow', component: FollowComponent},
  { path: 'follow/:p3', component: FollowComponent},
  { path: 'following', component: FollowingComponent},
  { path: 'following/:p3', component: FollowingComponent},
  { path: 'postframe', component: PostFrameComponent},
  { path: 'home', component: HomeComponent},
  { path: 'menubar', component: MenubarComponent},
  { path: 'comment/:p1', component: CommentComponent},
  { path: 'search', component: SearchListComponent},
  { path: 'search/:p1/:p2', component: SearchListComponent},
  { path: 'search/:p1/:p2/', component: SearchListComponent},
  { path: 'otherprofile/:p3', component: OtherProfileComponent},
  { path: 'postframeother', component: PostframeotherComponent},



  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
