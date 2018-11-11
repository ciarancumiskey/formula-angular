import { Injectable } from '@angular/core';
import { Team } from './team';
import { DEFAULTTEAMS } from './mockteams';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root' //This makes the service available for dependency injection
})
export class TeamService {
  /**
   * Service-ception!
   * @param messageService 
   */
  constructor(private messageService: MessageService) { }

  getTeams(): Observable<Team[]>{
    this.messageService.add('Teams retrived');
    return of(DEFAULTTEAMS);
  }
}
