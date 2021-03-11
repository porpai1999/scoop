import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { FeedComponent } from './feed/feed.component';
import { FollowComponent } from './follow/follow.component';
import { FollowingComponent } from './following/following.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HomeoutComponent } from './homeout/homeout.component';
import { LoginComponent } from './login/login.component';
import { PhotoComponent } from './photo/photo.component';
import { PostFrameComponent } from './post-frame/post-frame.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: HomeoutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  // { path: 'home', component: HomeComponent},
  { path: 'home/:p1', component: HomeComponent},
  { path: 'Header/:p1', component: HeaderComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'profile/:p1', component: ProfileComponent},
  { path: 'homeout', component: HomeoutComponent},
  { path: 'feed', component: FeedComponent},
  { path: 'editprofile/:p1', component: EditprofileComponent},
  { path: 'posts/:p1', component: PostsComponent},
  { path: 'posts', component: PostsComponent},
  { path: 'photo', component: PhotoComponent},
  { path: 'follow', component: FollowComponent},
  { path: 'following', component: FollowingComponent},
  { path: 'postframe/:p1', component: PostFrameComponent},
  { path: 'home', component: HomeComponent},


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
