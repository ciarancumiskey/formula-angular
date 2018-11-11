import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent implements OnInit {
  /**
   * 
   * @param messageService Angular will only allow PUBLIC components to be bound to the template
   */
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
