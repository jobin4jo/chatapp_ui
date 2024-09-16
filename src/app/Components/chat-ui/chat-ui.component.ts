import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignalRServiceService } from '../../Services/signal-rservice.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-chat-ui',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './chat-ui.component.html',
  styleUrl: './chat-ui.component.scss',
})
export class ChatUIComponent implements OnInit {
  cdf = inject(ChangeDetectorRef);
  public message: string;
  public username = "";
  public receiverUserName: string;
  public messages: { user: string, message: string, recieverName: string }[] = [];
  SignalRServiceService: any;
  public paymentAmount: number;
  public isPaymentModalOpen: boolean = false;
  constructor(private route: Router, protected signalR: SignalRServiceService, private use: UserService, private query: ActivatedRoute) {

  }


  isValidAmount(): boolean {
    return this.paymentAmount != null && this.paymentAmount > 0;
  }
  ngOnInit(): void {
    const data = localStorage.getItem('user');
    if (data) {
      let model = JSON.parse(data);
      this.username = model.userName;
    }


    var userdetail = localStorage.getItem("userDetail");
    if (userdetail) {
      const parsedUserDetail = JSON.parse(userdetail);
      console.log(parsedUserDetail);
      this.receiverUserName = parsedUserDetail.userName;
      console.log(this.receiverUserName);
      this.signalR.getMessages(parsedUserDetail.userName);
      this.cdf.detectChanges();
    }
    this.signalR.messageReceived.subscribe((res: any) => {
      this.messages = res;
      console.log(this.messages, "initial");
      this.cdf.detectChanges();
    })

  }


  sendMessage() {
    if (this.receiverUserName && this.message) {

      this.signalR.sendMessageToUser(this.receiverUserName, this.message);

      this.messages.push({ "user": this.username, "message": this.message, "recieverName": this.receiverUserName });
      this.message = '';

    }
  }

  openPaymentModal() {
    this.isPaymentModalOpen = true; // Open the modal
  }

  closePaymentModal() {
    this.isPaymentModalOpen = false; // Close the modal
  }
  payment() {

    this.paymentAmount
    console.log(this.paymentAmount);
    console.log(this.username);
    console.log(this.receiverUserName);
    let obj = {
      amount: this.paymentAmount.toString(),
      senderName: this.username,
      recieverName: this.receiverUserName,
    }
    this.use.paymentrequest(obj).subscribe((res: any) => {
      console.log(res.data)
      window.location.replace(res.data.data);
      this.message = `${obj.amount} Send`;
      this.signalR.sendMessageToUser(this.receiverUserName, this.message);
      // this.messages.push({ "user": this.username, "message": this.message, "recieverName": this.receiverUserName });
      this.sendMessage()
    })

  }

}