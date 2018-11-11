import { Component, OnInit } from '@angular/core';
import { Team } from '../Team';
import { TeamService } from '../team.service';

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
  selectedTeam: Team; //Don't assign anything, there shouldn't be a selected Team when the app starts
  onSelect(team: Team): void {
    this.selectedTeam = team;
  }
  /**
   * This needs an asynchronous signature, as a real app will be working with a remote server, which demands async. ops.
   */
  getTeams(): void{
    this.teamService.getTeams().subscribe(teams => this.teams = teams); //This way the UI won't freeze while waiting on data
  }
}
