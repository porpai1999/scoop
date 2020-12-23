import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import {ButtonModule} from 'primeng/button';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent
=======
import { HomeComponent } from './home/home.component';
import {MenubarModule} from 'primeng/menubar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ButtonModule} from 'primeng/button';

import {ToolbarModule} from 'primeng/toolbar';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
>>>>>>> c31389029a2ba02683388c05a4b1ab90cfcfcdfb
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
<<<<<<< HEAD
=======
    MenubarModule,
    ToolbarModule,
    FontAwesomeModule,
>>>>>>> c31389029a2ba02683388c05a4b1ab90cfcfcdfb
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
