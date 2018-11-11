/**
 * This service exposes its cache of messages
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  /**
   * Adds a message to the cache
   * @param message The message to be added to the cache
   */
  add(message: string){
    this.messages.push(message);
  }
  /**
   * Deletes all messages in the cache
   */
  clear() {
    this.messages = [];
  }
}
