
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceService {
  private hubConnection!: HubConnection;

  user: string | number;
  public messagesToUI: { user: string, message: string, recieverName: string }[] = [];

  messageReceived = new Subject<{ user: string, message: string, recieverName: string }[]>();

  constructor() {
    console.log("SignalRServiceService constructor");
    this.createConnection();
    this.addMessageListener();
  }

  public createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7050/userHub")
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  private addMessageListener() {
    this.hubConnection.on('ReceiveMessage', (user: string, message: string, receiverName: string) => {
      this.messagesToUI.push({ user, message, recieverName: receiverName });
      this.messageReceived.next(this.messagesToUI);
    });

    this.hubConnection.on('ReceiveMessageHistory', (messages: any[]) => {
      console.log(messages, "Message history received");
      this.messagesToUI = messages.map(x => ({
        user: x.senderName,
        message: x.message,
        recieverName: x.receiverName
      }));
      console.log(this.messagesToUI);
      this.messageReceived.next(this.messagesToUI);
    });
  }


  public login(username: string): void {
    this.hubConnection.invoke('Login', username).catch(ex => console.error(ex.toString()));
  }

  public sendMessageToUser(receiverUserName: string, message: string): void {
    this.hubConnection.invoke('SendMessageToUser', receiverUserName, message)
      .catch(err => console.error(err.toString()));
  }

  public getMessages(otherUserName: string): void {
    this.hubConnection.invoke('GetMessages', otherUserName)
      .catch(err => console.error(err.toString()));
  }
}
