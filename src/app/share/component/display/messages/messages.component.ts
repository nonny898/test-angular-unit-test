import { Component } from '@angular/core';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  constructor(public messageService: MessagesService) {}

  get recentMessage(): string {
    const messages = this.messageService.messages;
    if (messages.length > 0) {
      return messages[messages.length - 1];
    }
    return '';
  }
}
