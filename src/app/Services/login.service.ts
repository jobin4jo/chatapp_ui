import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Chat_API = environment.ChatAPI;
  AuthAPI = '/User/Login';
  constructor(private http: HttpClient) {

  }
  UserLogin(userReq: User) {
    return this.http.post(this.Chat_API + this.AuthAPI, userReq);
  }
}
