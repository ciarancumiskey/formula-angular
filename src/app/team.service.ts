import { Injectable } from '@angular/core';
import { Team } from './team';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root' //This makes the service available for dependency injection
})
export class TeamService {
  

  private teamsUrl = 'api/teams';
  /**
   * Service-ception!
   * @param messageService 
   */
  constructor(private http: HttpClient, private messageService: MessageService) { }
  /**
   * All HttpClient methods will return a RxJS Observable of some sort, as HTTP will return a response for each request.
   */
  getTeams(): Observable<Team[]>{
    /*return of(teams);*/
    return this.http.get<Team[]>(this.teamsUrl)
      .pipe(
        tap(_ => this.log('Fetched teams')),
        catchError(this.handleError('getTeams', []))
      );
  }
  /**
   * Retrieves a single team's details.
   * @param id The desired team's ID
   */
  getTeam(id: number): Observable<Team> {
    const url = `${this.teamsUrl}/${id}`; //Construct the request URL
    /*return of(DEFAULTTEAMS.find(team => team.id === id));*/
    //Retrieve a single team
    return this.http.get<Team>(url).pipe(
      tap(_ => this.log(`Fetched team #${id}`)),
      catchError(this.handleError<Team>(`getTeam #${id}`))
    );
  }

  updateTeam(team: Team): Observable<any>{
    return this.http.put(this.teamsUrl, team, httpOptions).pipe(
      tap(_ => this.log(`Update team #${team.id}`)),
      catchError(this.handleError<any>('updateTeam'))
    );
  }
  /**
   * 
   * @param team The team to be added to the database
   */
  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.teamsUrl, team, httpOptions).pipe(
      tap((newTeam: Team) => this.log(`Added team w/id=${newTeam.id}`)),
      catchError(this.handleError<Team>('addTeam'))
    );
  }
  /**
   * 
   * @param team The team to be deleted from the database
   */
  deleteTeam(team: Team | number): Observable<Team> {
    const id = typeof team === 'number' ? team : team.id;
    const url = `${this.teamsUrl}/${id}`;
    return this.http.delete<Team>(url, httpOptions).pipe(
      tap(_ => this.log(`Deleted team #${id}`)),
      catchError(this.handleError<Team>('deleteTeam'))
    );
  }
  searchTeams(term: string): Observable<Team[]>{
    if(!term.trim()){
      return of([]); //Return a blank array if there's no search term
    }
    return this.http.get<Team[]>(`${this.teamsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`Found teams matching "${term}`)),
      catchError(this.handleError<Team[]>('searchTeams', []))
    );
  }
  private log(message: string){
    this.messageService.add(`TeamService: ${message}`);
  }
  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
