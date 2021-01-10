import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeoutComponent } from './homeout/homeout.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: HomeoutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'homeout', component: HomeoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
