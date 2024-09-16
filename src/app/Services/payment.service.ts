import { Injectable } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private net: HttpClient) { }
  // paymentrequest(request: any) {
  //   return this.net.post("https://localhost:7050/api/Payment/Initial", request);
  // }
}
