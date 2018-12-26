import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';

import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatCollection: AngularFirestoreCollection<ChatMessage>;
  chatMessages: Observable<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: Observable<string>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.chatCollection = this.afs.collection('messages', ref => ref.limit(25).orderBy('timeSent', 'asc'));
    this.chatMessages = this.chatCollection.valueChanges();
    // this.afAuth.authState.subscribe(auth => {
      // if (auth !== undefined && auth !== null) {
      //   this.user = auth;
      // }
      // this.getUser().subscribe(a => {
      //   this.userName = a.displayName;
      // });
    // });
  }

  sendMessage(message: string) {
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'test@email.com';
    this.chatCollection.add({
      message: message,
      timeSent: timestamp,
      // userName: this.userName,
      userName: 'Ivan',
      email: email
    });
  }

  getMessages() {
    return this.chatMessages;
  }

  getTimeStamp() {
    const now = new Date();
    // const date =
    //   now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
    // const time =
    //   now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

    // return date + ' ' + time;
    return now;
  }
}
