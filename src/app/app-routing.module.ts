import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { FeedComponent } from './feed/feed.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HomeoutComponent } from './homeout/homeout.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: HomeoutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
  { path: 'home/:p1', component: HomeComponent},
  { path: 'Header/:p1', component: HeaderComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'profile/:p1', component: ProfileComponent},
  { path: 'homeout', component: HomeoutComponent},
  { path: 'feed', component: FeedComponent},
  { path: 'editprofile/:p1', component: EditprofileComponent},
  { path: 'posts', component: PostsComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
