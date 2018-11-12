import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  teams: Team[] = [];
  /**
   * 
   * @param teamService The TeamService which the constructor expects Angular to inject into this property
   */
  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getTeams().subscribe(teams => this.teams = teams.slice(1, 5)); //.slice() will result in only (end - start) teams being returned
  }
}
