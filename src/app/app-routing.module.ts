import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';

const routes: Routes = [ 
  //Once set up, the router will match that URL to "path: 'teams'" and display the corresponding component
  { path: 'teams', component: TeamsComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: TeamDetailComponent}, //The colon specifies that id is a placeholder for a specific team's ID
  //This will redirect the user to /dashboard immediately upon visiting this site
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //This method gets its name because the router is configured at the app's root folder
  exports: [RouterModule]
})
export class AppRoutingModule { }
