import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../models/chat-message.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  user: firebase.User;
  feed: ChatMessage[];

  constructor(
    private chatService: ChatService,
    private afAuth: AngularFireAuth,
    private router: Router) {
      this.afAuth.auth.onAuthStateChanged(auth => {
        if (auth !== undefined && auth !== null) {
          this.user = auth;
        } else {
          this.router.navigate(['login']);
        }
      });
  }

  ngOnInit() {
    if (this.user) {
      this.chatService.getMessages().subscribe(messages => this.feed = messages);
    }
  }

  ngOnChanges() {
    if (this.user) {
      this.chatService.getMessages().subscribe(messages => this.feed = messages);
    }
  }
}
