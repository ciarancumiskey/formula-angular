import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../team';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TeamService } from '../team.service';
@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.sass']
})
export class TeamDetailComponent implements OnInit {
  @Input() team: Team;
  /**
   * 
   * @param route Holds info about the route to this instance of the TeamDetailComponent
   * @param teamService Retrieves data from a remote server to get the team you want to display
   * @param location Angular service for interacting with the browser
   */
  constructor(private route: ActivatedRoute, private teamService: TeamService, private location: Location) { }

  ngOnInit(): void {
    this.getTeam();
  }

  getTeam(): void {
    const id = +this.route.snapshot.paramMap.get('id'); //'+' is a JS operator for converting a string to a number
    this.teamService.getTeam(id).subscribe(team => this.team = team);
  }
  /**
   * Takes the user to the previous page
   */
  goBack(): void {
    this.location.back();
  }
}
