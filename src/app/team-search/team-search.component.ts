import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.sass']
})
export class TeamSearchComponent implements OnInit {
  teams$: Observable<Team[]>;
  private searchTerms = new Subject<string>();
  constructor(private teamService: TeamService) { }

  /**
   * 
   * @param term Gets pushed into the Observables stream
   */
  search(term: string): void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.teams$ = this.searchTerms.pipe(
      debounceTime(1000), //HTTP requests are never less than a second apart
      distinctUntilChanged(), //They also need to be unique
      switchMap((term: string) => this.teamService.searchTeams(term)),
    );
  }

}
