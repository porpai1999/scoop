import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatapassService {
  account;
  // user_img = "http://nodescoop.comsciproject.com/images/userprofile.png";
  // other_user_img = "http://nodescoop.comsciproject.com/images/userprofile.png";
  host = "http://nodescoop.comsciproject.com";
  // host = "http://localhost:3000";
  constructor() { }
}
