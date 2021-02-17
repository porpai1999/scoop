import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { RegisterComponent } from './register/register.component';
import {CalendarModule} from 'primeng/calendar';
import {MegaMenuModule} from 'primeng/megamenu';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {SlideMenuModule} from 'primeng/slidemenu';

import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

import {DialogModule} from 'primeng/dialog';
import { PhotoComponent } from './photo/photo.component';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { Routes, RouterModule } from '@angular/router';
import { FollowComponent } from './follow/follow.component';
import { MenubarComponent } from './menubar/menubar.component';
import { FollowingComponent } from './following/following.component';

import { NgxCaptchaModule } from 'ngx-captcha';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'photo', component: PhotoComponent},
  { path: 'follow', component: FollowComponent},
  { path: 'following', component: FollowingComponent},

];

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {SelectButtonModule} from 'primeng/selectbutton';
import { HomeoutComponent } from './homeout/homeout.component';

import { CookieService } from 'ngx-cookie-service';
import { FeedComponent } from './feed/feed.component'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ProfileComponent,
    HomeComponent,
    PhotoComponent,
    FollowComponent,
    MenubarComponent,
    FollowingComponent,
    HomeoutComponent,
    FeedComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CalendarModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    SelectButtonModule,
    MatSliderModule,
    MatListModule,
    MatGridListModule,
    RouterModule.forRoot(routes),
    
    MegaMenuModule,
    TieredMenuModule,
    SlideMenuModule,
    FormsModule,

    NgxCaptchaModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
