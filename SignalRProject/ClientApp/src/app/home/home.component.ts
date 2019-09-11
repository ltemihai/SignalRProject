import { Component, OnDestroy } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { NOTIFICATION_KEYS, NOTIFICATION_METHODS } from '..';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {

  public messages: Array<string> = new Array<string>();
  public selection = 'Everyone';
  public inputText = 'This is sparta';
  public connectionIdText = 'sparta1';
  public options = ['Everyone', 'Myself', 'PrivateGroup'];

  constructor(private notificationService: NotificationService) {
    console.log('START HOME PAGE');
    this.notificationService.createNewConnection();
    this.notificationService.subscribeToKey(NOTIFICATION_KEYS.RECEIEVE_MESSAGE, (message) => this.onMessageResponse(message));
    this.notificationService.subscribeToKey(NOTIFICATION_KEYS.USER_CONNECTED, (message) => this.onUserConnect(message));
    this.notificationService.subscribeToKey(NOTIFICATION_KEYS.USER_DISCONNECTED, (message) => this.onUserDisconnected(message));
    this.notificationService.startConnection();
  }

  ngOnDestroy(): void {
    this.notificationService.unsubscribeFromKey(NOTIFICATION_KEYS.RECEIEVE_MESSAGE);
    this.notificationService.unsubscribeFromKey(NOTIFICATION_KEYS.USER_CONNECTED);
    this.notificationService.unsubscribeFromKey(NOTIFICATION_KEYS.USER_DISCONNECTED);
  }

  public sendMessage() {
    if (this.selection === 'Everyone') {
      this.notificationService.sendMessageToAll(NOTIFICATION_METHODS.SEND_MESSAGE_TO_ALL, this.inputText)
        .then(() => console.log('Message Sent to Everyone'));
    } else if (this.selection === 'Myself') {
      this.notificationService.sendMessageToCaller(NOTIFICATION_METHODS.SEND_MESSAGE_TO_CALLER, this.inputText)
        .then(() => console.log('Message Sent to Myself'));
    } else if (this.selection === 'PrivateGroup') {
      this.notificationService.sendMessageToGroup(NOTIFICATION_METHODS.SEND_MESSAGE_TO_GROUP, this.selection, this.inputText)
        .then(() => console.log('Message Sent to Group'));
    } else {
      this.notificationService.sendMessageToClient(NOTIFICATION_METHODS.SEND_MESSAGE_TO_USER, this.selection, this.inputText)
        .then(() => console.log('Message Sent to Client'));
    }
  }

  public joinGroup() {
    this.notificationService.joinGroup(NOTIFICATION_METHODS.JOIN_GROUP, 'PrivateGroup');
  }

  public onMessageResponse(message: any) {
    console.log('Message received', message);
    this.messages.push(message);
  }

  public onUserConnect(message: any) {
    console.log('User connected', message);
    this.messages.push(message);
    this.options.push(message);
  }

  public onUserDisconnected(message: any) {
    console.log('User disconnected', message);
    this.messages.splice(this.messages.indexOf(message), 1);
    this.options.splice(this.options.indexOf(message), 1);
  }

}
