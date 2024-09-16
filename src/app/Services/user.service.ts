import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  Chat_API = environment.ChatAPI;
  AuthAPI = '/User/getUser';

  getActiveUserList(id: number) {
    let params = new HttpParams().set('id', id.toString());
    return this.http.get(this.Chat_API + this.AuthAPI, { params })
  }
  paymentrequest(request: any) {
    return this.http.post("https://localhost:7050/api/Payment/Initial", request);
  }
}
