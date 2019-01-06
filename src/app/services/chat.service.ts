import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: firebase.User;
  chatCollection: AngularFirestoreCollection<ChatMessage>;
  chatMessages: Observable<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: string;
  now: Date;

  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.auth.onAuthStateChanged(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;

        this.chatCollection = this.afs.collection('messages', ref => ref.orderBy('timeSent', 'asc'));
        this.chatMessages = this.chatCollection.valueChanges();

        this.getUser().valueChanges().subscribe((data: any) => {
          this.userName = data.displayName;
        });
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(message: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatCollection.add({
      message: message,
      timeSent: timestamp,
      userName: this.userName,
      email: email
    });
  }

  getMessages() {
    return this.chatMessages;
  }

  getTimeStamp() {
    return this.now = new Date();
  }
}
