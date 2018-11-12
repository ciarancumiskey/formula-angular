import { Injectable } from '@angular/core';
import { Team } from './team';
import { DEFAULTTEAMS } from './mockteams'; //I really shouldn't be here, but a data server hasn't been picked yet
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
    this.messageService.add('Teams retrieved');
    return of(DEFAULTTEAMS);
  }

  getTeam(id: number): Observable<Team> {
    this.messageService.add(`TeamService: fetched team #${id}`);
    return of(DEFAULTTEAMS.find(team => team.id === id));
  }
}
