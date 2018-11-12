import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Team } from './team';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  teams: Team[] = [];
  createDb() {
    let teams = [
      { id: 1, name: 'AMG Mercedes', country: 'Germany'},
      { id: 2, name: 'Scuderia Ferrari', country: 'Italy'},
      { id: 3, name: 'Red Bull Racing-Honda', country: 'Austria'},
      { id: 4, name: 'Renault Sport F1', country: 'France'},
      { id: 5, name: 'Alfa Romeo Sauber', country: 'Switzerland'},
      { id: 6, name: 'McLaren-Renault', country: 'UK'},
      { id: 7, name: 'Racing What\'s The Point-Mercedes', country: 'Canada'},
      { id: 8, name: 'BMW Williams Racing', country: 'UK'},
      { id: 9, name: 'Prema Powerteam-Ferrari', country: 'Italy'},
      { id: 10, name: 'Autobacs Racing Team Aguri-Honda', country: 'Japan'},
      { id: 11, name: 'Haas F1-Ferrari', country: 'USA'},
      { id: 12, name: 'Stoddart-Honda', country: 'Australia'}
    ];
    return {teams};
  }
  constructor() { }

  /**
   * This overrides the genId method so that a team will always have an ID. If the teams array is empty, the ID defaults to 1,
   * otherwise it increments the highest ID so far and assigns it to the new team.
   * @param teams The team to be added
   */
  genId(teams: Team[]): number {
    return teams.length > 0 ? Math.max(...teams.map(team => team.id)) + 1 : 1;
  }
}
