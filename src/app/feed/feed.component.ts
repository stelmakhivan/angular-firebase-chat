import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: ChatMessage[];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getMessages().subscribe(messages => {
      this.feed = messages;
    });
  }

  ngOnChanges() {
    this.chatService.getMessages().subscribe(messages => {
      this.feed = messages;
    });
  }
}
