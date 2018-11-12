import { Component, OnInit } from '@angular/core';
import { Team } from '../Team';
import { TeamService } from '../team.service';
import { Observable } from 'rxjs';

@Component({  //This specifies the Angular metadata
  selector: 'app-teams', //CSS selector
  templateUrl: './teams.component.html', //location of the template file
  styleUrls: ['./teams.component.sass'] //location of this component's private styles
})
export class TeamsComponent implements OnInit {
  teams: Team[];
  /**
   * 
   * @param teamService This identifies the TeamService property as a TeamService injection site. When the app creates a 
   * TeamsComponent, this parameter is set as a singleton.
   */
  constructor(private teamService: TeamService) { }

  ngOnInit() {
    //Put initialisation logic here
    this.getTeams(); //The constructor shouldn't do anything, ESPECIALLY NOT DATA REQUESTS
  }
  /**selectedTeam: Team; //Don't assign anything, there shouldn't be a selected Team when the app starts
  onSelect(team: Team): void {
    this.selectedTeam = team;
  }This stuff is now redundant after implementing routing*/
  /**
   * This needs an asynchronous signature, as a real app will be working with a remote server, which demands async. ops.
   */
  getTeams(): void{
    this.teamService.getTeams().subscribe(teams => this.teams = teams); //This way the UI won't freeze while waiting on data
  }
  /**
   * 
   * @param name The name of the new team
   * @param country The country this new team comes from
   */
  add(name: string, country: string): void{
    name = name.trim();
    if(!name) { return; } //No point adding a team with no name
    this.teamService.addTeam({ name, country } as Team).subscribe(team => {
      this.teams.push(team);
    })
  }
  /**
   * 
   * @param andrea_moda The team to be deleted, named in honour of F1's worst ever team.
   */
  delete(andrea_moda: Team): void {
    this.teams = this.teams.filter(h => h !== andrea_moda);
    this.teamService.deleteTeam(andrea_moda).subscribe();
  }
}
